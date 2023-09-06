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
import { getBankingServiceById, updateBankingServiceById } from 'apiSdk/banking-services';
import { bankingServiceValidationSchema } from 'validationSchema/banking-services';
import { BankingServiceInterface } from 'interfaces/banking-service';
import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { getUsers } from 'apiSdk/users';
import { getFinancialServices } from 'apiSdk/financial-services';

function BankingServiceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BankingServiceInterface>(
    () => (id ? `/banking-services/${id}` : null),
    () => getBankingServiceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BankingServiceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBankingServiceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/banking-services');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BankingServiceInterface>({
    initialValues: data,
    validationSchema: bankingServiceValidationSchema,
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
              label: 'Banking Services',
              link: '/banking-services',
            },
            {
              label: 'Update Banking Service',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Banking Service
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.service_name}
            label={'Service Name'}
            props={{
              name: 'service_name',
              placeholder: 'Service Name',
              value: formik.values?.service_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.service_details}
            label={'Service Details'}
            props={{
              name: 'service_details',
              placeholder: 'Service Details',
              value: formik.values?.service_details,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.service_status}
            label={'Service Status'}
            props={{
              name: 'service_status',
              placeholder: 'Service Status',
              value: formik.values?.service_status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="service_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Service Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.service_start_date ? new Date(formik.values?.service_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('service_start_date', value)}
            />
          </FormControl>
          <FormControl id="service_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Service End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.service_end_date ? new Date(formik.values?.service_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('service_end_date', value)}
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
              onClick={() => router.push('/banking-services')}
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
    entity: 'banking_service',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BankingServiceEditPage);
