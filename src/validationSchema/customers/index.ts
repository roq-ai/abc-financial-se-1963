import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  customer_status: yup.string().required(),
  customer_start_date: yup.date().nullable(),
  customer_end_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  financial_service_id: yup.string().nullable().required(),
  insurance_policy_id: yup.string().nullable().required(),
  banking_service_id: yup.string().nullable().required(),
});
