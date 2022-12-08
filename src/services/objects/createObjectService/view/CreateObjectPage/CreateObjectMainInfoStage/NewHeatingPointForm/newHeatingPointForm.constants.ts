import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  heatingPointType: yup.string().required('Обязательное поле'),
  heatingPointNumber: yup.string().required('Обязательное поле'),
});
