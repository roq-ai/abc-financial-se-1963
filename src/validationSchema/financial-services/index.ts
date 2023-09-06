import * as yup from 'yup';

export const financialServiceValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  service_type: yup.string().nullable(),
  service_status: yup.string().nullable(),
  creation_date: yup.date().nullable(),
  last_updated: yup.date().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
