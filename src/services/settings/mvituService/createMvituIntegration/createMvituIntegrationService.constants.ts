import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  inn: yup.string().required('Это поле обязательное'),
  legalName: yup.string().required('Это поле обязательное'),
});
