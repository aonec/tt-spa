import * as Yup from 'yup';
import { CalculatorConnectionType } from './ConnectionSettings.types';

export const ConnectionTypeDictionary: {
  [key in CalculatorConnectionType]: string;
} = {
  [CalculatorConnectionType.Connected]: 'Есть подключение',
  [CalculatorConnectionType.NoConnection]: 'Отсутствует',
};

export const validationSchema = Yup.object().shape({
  connectionType: Yup.string().nullable().required('Это поле обязательное'),
  calculatorId: Yup.string()
    .nullable()
    .when('connectionType', {
      is: CalculatorConnectionType.Connected,
      then: (schema) => schema.nullable().required('Это поле обязательное'),
    }),
  entryNumber: Yup.number()
    .nullable()
    .when('connectionType', {
      is: CalculatorConnectionType.Connected,
      then: (schema) => schema.nullable().required('Это поле обязательное'),
    }),
});
