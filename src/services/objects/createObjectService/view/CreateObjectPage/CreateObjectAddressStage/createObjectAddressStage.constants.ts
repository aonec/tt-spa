import * as yup from 'yup';

export const validationSchema = yup.object().shape({
        city: yup.string().required('Обязательное поле'),
        street: yup.string().required('Обязательное поле'),
        house: yup.string().required('Обязательное поле'),
        corpus: yup.string(),
        index: yup.string(),
      });