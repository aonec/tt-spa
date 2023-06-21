import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('Это поле обязательное'),
  lastName: yup.string().required('Это поле обязательное'),
});
