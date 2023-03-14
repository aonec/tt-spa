import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  Name: yup.string().required('Введите название отчёта'),
  HousingStockIds: yup.array().of(yup.number()).required('Выберите адрес'),
});
