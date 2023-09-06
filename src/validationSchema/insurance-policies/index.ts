import * as yup from 'yup';

export const insurancePolicyValidationSchema = yup.object().shape({
  policy_name: yup.string().required(),
  policy_details: yup.string().nullable(),
  policy_status: yup.string().required(),
  policy_start_date: yup.date().nullable(),
  policy_end_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  financial_service_id: yup.string().nullable().required(),
});
