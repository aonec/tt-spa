import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  addressSrt: yup.string().required('Это поле обязаетльное'),
  fias: yup.string().required('Это поле обязаетльное'),
  buildingType: yup.string().required('Это поле обязаетльное'),
  buildingInputNum: yup.string().required('Это поле обязаетльное'),
});
