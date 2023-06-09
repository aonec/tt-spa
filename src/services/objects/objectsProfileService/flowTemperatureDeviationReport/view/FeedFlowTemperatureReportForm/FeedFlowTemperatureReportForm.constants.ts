import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Это поле обязательное'),
  houseMangementId: Yup.string().nullable(),
  temperature: Yup.string().required('Это поле обязательное'),
});
