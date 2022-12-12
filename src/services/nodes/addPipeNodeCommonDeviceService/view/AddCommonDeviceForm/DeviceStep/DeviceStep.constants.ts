import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  model: Yup.string().required('Это поле обязательное'),
  serialNumber: Yup.string().required('Это поле обязательное'),
  pipeId: Yup.string().nullable().required('Это поле обязательное'),
});
