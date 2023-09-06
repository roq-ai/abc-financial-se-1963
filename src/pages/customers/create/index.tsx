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

import { createCustomer } from 'apiSdk/customers';
import { customerValidationSchema } from 'validationSchema/customers';
import { UserInterface } from 'interfaces/user';
import { FinancialServiceInterface } from 'interfaces/financial-service';
import { InsurancePolicyInterface } from 'interfaces/insurance-policy';
import { BankingServiceInterface } from 'interfaces/banking-service';
import { getUsers } from 'apiSdk/users';
import { getFinancialServices } from 'apiSdk/financial-services';
import { getInsurancePolicies } from 'apiSdk/insurance-policies';
import { getBankingServices } from 'apiSdk/banking-services';
import { CustomerInterface } from 'interfaces/customer';

function CustomerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomer(values);
      resetForm();
      router.push('/customers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerInterface>({
    initialValues: {
      customer_status: '',
      customer_start_date: new Date(new Date().toDateString()),
      customer_end_date: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      financial_service_id: (router.query.financial_service_id as string) ?? null,
      insurance_policy_id: (router.query.insurance_policy_id as string) ?? null,
      banking_service_id: (router.query.banking_service_id as string) ?? null,
    },
    validationSchema: customerValidationSchema,
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
              label: 'Customers',
              link: '/customers',
            },
            {
              label: 'Create Customer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Customer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.customer_status}
            label={'Customer Status'}
            props={{
              name: 'customer_status',
              placeholder: 'Customer Status',
              value: formik.values?.customer_status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="customer_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Customer Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.customer_start_date ? new Date(formik.values?.customer_start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('customer_start_date', value)}
            />
          </FormControl>
          <FormControl id="customer_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Customer End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.customer_end_date ? new Date(formik.values?.customer_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('customer_end_date', value)}
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
          <AsyncSelect<InsurancePolicyInterface>
            formik={formik}
            name={'insurance_policy_id'}
            label={'Select Insurance Policy'}
            placeholder={'Select Insurance Policy'}
            fetcher={getInsurancePolicies}
            labelField={'policy_name'}
          />
          <AsyncSelect<BankingServiceInterface>
            formik={formik}
            name={'banking_service_id'}
            label={'Select Banking Service'}
            placeholder={'Select Banking Service'}
            fetcher={getBankingServices}
            labelField={'service_name'}
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
              onClick={() => router.push('/customers')}
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
    entity: 'customer',
    operation: AccessOperationEnum.CREATE,
  }),
)(CustomerCreatePage);
