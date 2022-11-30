import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  houseManagement: yup.string().required('Обязательное поле'),
  objectCategotry: yup.string().required('Обязательное поле'),
  objectType: yup.string().required('Обязательное поле'),
  heatingPoint: yup.string(),
});

export const initialValues = {
  houseManagement: '',
  objectCategotry: '',
  objectType: '',
  heatingPoint: { heatingPointType: '', heatingPointNumber: '' },
};
