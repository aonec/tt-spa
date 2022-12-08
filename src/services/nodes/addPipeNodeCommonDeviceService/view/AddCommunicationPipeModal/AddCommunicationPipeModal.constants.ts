import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  number: Yup.number()
    .min(1, 'Номер должен быть не меньше 1')
    .max(10, 'Номер должен быть не больше 10')
    .required('Это поле обязательное'),
  magistral: Yup.string().nullable().required('Это поле обязательное'),
  diameter: Yup.string().required('Это поле обязательное'),
});
