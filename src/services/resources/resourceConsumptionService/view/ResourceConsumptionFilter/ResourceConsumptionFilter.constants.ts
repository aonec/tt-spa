import * as yup from 'yup';

export const resourceConsumptionFilterValidationSchema = yup.object().shape({
  HousingStockId: yup.string().nullable().required('Введите адрес'),
  From: yup.string().required('Обязательное поле'),
});
