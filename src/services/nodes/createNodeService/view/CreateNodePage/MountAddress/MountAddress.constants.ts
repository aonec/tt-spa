import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  city: Yup.string().nullable().required('Это поле обязательное'),
  street: Yup.string().required('Это поле обязательное'),
  number: Yup.string().required('Это поле обязательное'),
});
