import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  registrationType: Yup.string().nullable().required('Это поле обязательное'),
});
