import * as yup from 'yup';

export const npsValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  nps_date: yup.date().required(),
  nps_status: yup.string().required(),
  nps_comment: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  financial_service_id: yup.string().nullable().required(),
});
