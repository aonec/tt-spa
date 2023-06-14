import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  homeownerFullName: yup.string().required('Это поле обязательно'),
  homeownerPhone: yup.string().required('Это поле обязательно'),
  date: yup.string().required('Это поле обязательно'),
  sealCountPlan: yup.number().required('Это поле обязательно'),
});
