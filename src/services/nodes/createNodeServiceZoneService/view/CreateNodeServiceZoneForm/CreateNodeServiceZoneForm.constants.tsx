import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Это поле обязательное'),
});
