import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getInsurancePolicyById, updateInsurancePolicyById } from 'apiSdk/insurance-policies';
import { insurancePolicyValidationSchema } from 'validationSchema/insurance-policies';
import { InsurancePolicyInterface } from 'interfaces/insurance-policy';
import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { getUsers } from 'apiSdk/users';
import { getFinancialServices } from 'apiSdk/financial-services';

function InsurancePolicyEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<InsurancePolicyInterface>(
    () => (id ? `/insurance-policies/${id}` : null),
    () => getInsurancePolicyById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InsurancePolicyInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateInsurancePolicyById(id, values);
      mutate(updated);
      resetForm();
      router.push('/insurance-policies');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<InsurancePolicyInterface>({
    initialValues: data,
    validationSchema: insurancePolicyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Insurance Policies',
              link: '/insurance-policies',
            },
            {
              label: 'Update Insurance Policy',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Insurance Policy
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.policy_name}
            label={'Policy Name'}
            props={{
              name: 'policy_name',
              placeholder: 'Policy Name',
              value: formik.values?.policy_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.policy_details}
            label={'Policy Details'}
            props={{
              name: 'policy_details',
              placeholder: 'Policy Details',
              value: formik.values?.policy_details,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.policy_status}
            label={'Policy Status'}
            props={{
              name: 'policy_status',
              placeholder: 'Policy Status',
              value: formik.values?.policy_status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="policy_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Policy Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.policy_start_date ? new Date(formik.values?.policy_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('policy_start_date', value)}
            />
          </FormControl>
          <FormControl id="policy_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Policy End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.policy_end_date ? new Date(formik.values?.policy_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('policy_end_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<FinancialServiceInterface>
            formik={formik}
            name={'financial_service_id'}
            label={'Select Financial Service'}
            placeholder={'Select Financial Service'}
            fetcher={getFinancialServices}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/insurance-policies')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'insurance_policy',
    operation: AccessOperationEnum.UPDATE,
  }),
)(InsurancePolicyEditPage);
