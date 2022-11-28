import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  heatingPoint: yup.object().shape({
    heatingPointType: yup.string().required('Обязательное поле'),
    heatingPointNumber: yup.string().required('Обязательное поле'),
  }),
});

export const initialValues = {
  heatingPoint: { heatingPointType: '', heatingPointNumber: '' },
};
