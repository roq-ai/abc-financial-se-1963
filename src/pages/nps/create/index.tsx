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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createNps } from 'apiSdk/nps';
import { npsValidationSchema } from 'validationSchema/nps';
import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { getUsers } from 'apiSdk/users';
import { getFinancialServices } from 'apiSdk/financial-services';
import { NpsInterface } from 'interfaces/nps';

function NpsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: NpsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createNps(values);
      resetForm();
      router.push('/nps');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<NpsInterface>({
    initialValues: {
      score: 0,
      nps_date: new Date(new Date().toDateString()),
      nps_status: '',
      nps_comment: '',
      user_id: (router.query.user_id as string) ?? null,
      financial_service_id: (router.query.financial_service_id as string) ?? null,
    },
    validationSchema: npsValidationSchema,
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
              label: 'Nps',
              link: '/nps',
            },
            {
              label: 'Create Nps',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Nps
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Score"
            formControlProps={{
              id: 'score',
              isInvalid: !!formik.errors?.score,
            }}
            name="score"
            error={formik.errors?.score}
            value={formik.values?.score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="nps_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Nps Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.nps_date ? new Date(formik.values?.nps_date) : null}
              onChange={(value: Date) => formik.setFieldValue('nps_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.nps_status}
            label={'Nps Status'}
            props={{
              name: 'nps_status',
              placeholder: 'Nps Status',
              value: formik.values?.nps_status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.nps_comment}
            label={'Nps Comment'}
            props={{
              name: 'nps_comment',
              placeholder: 'Nps Comment',
              value: formik.values?.nps_comment,
              onChange: formik.handleChange,
            }}
          />

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
              onClick={() => router.push('/nps')}
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
    entity: 'nps',
    operation: AccessOperationEnum.CREATE,
  }),
)(NpsCreatePage);
