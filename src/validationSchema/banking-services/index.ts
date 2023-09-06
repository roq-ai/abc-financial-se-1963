import * as yup from 'yup';

export const bankingServiceValidationSchema = yup.object().shape({
  service_name: yup.string().required(),
  service_details: yup.string().nullable(),
  service_status: yup.string().required(),
  service_start_date: yup.date().nullable(),
  service_end_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
  financial_service_id: yup.string().nullable().required(),
});
