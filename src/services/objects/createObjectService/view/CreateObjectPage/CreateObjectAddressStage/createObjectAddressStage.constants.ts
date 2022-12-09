import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  city: yup.string().nullable().required('Обязательное поле'),
  street: yup.string().nullable().required('Обязательное поле'),
  house: yup.string().nullable().required('Обязательное поле'),
  corpus: yup.string().nullable(),
  index: yup.string().nullable(),
});
