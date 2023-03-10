import * as yup from 'yup';

export const resourceConsumptionFilterValidationSchema = yup.object().shape({
  HousingStockIds: yup.array().of(yup.number()).required('Выберите адрес'),
  From: yup.string().required('Обязательное поле'),
});
