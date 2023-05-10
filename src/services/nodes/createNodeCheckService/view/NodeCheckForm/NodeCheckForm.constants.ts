import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  checkType: yup.string().required('Это поле обязательно'),
  checkingDate: yup.string().required('Это поле обязательно'),
  registryNumber: yup.number().required('Это поле обязательно'),
});
