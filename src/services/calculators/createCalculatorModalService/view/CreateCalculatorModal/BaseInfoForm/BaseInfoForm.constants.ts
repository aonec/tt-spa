import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  serialNumber: yup.string().required('Это поле обязательно'),
  infoId: yup.number().required('Это поле обязательно'),
});
