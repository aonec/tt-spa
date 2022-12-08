import * as yup from 'yup';

export const resourceConsumptionFilterValidationSchema = yup.object().shape({
  HousingStockId: yup.string().required('Введите адресс'),
  From: yup.string().required('Обязательное поле'),
});
