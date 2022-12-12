import * as Yup from 'yup';
import { CalculatorConnectionType } from './ConnectionSettings.types';

export const ConnectionTypeDictionary: {
  [key in CalculatorConnectionType]: string;
} = {
  [CalculatorConnectionType.Connected]: 'Есть подключение',
  [CalculatorConnectionType.NoConnection]: 'Отстуствует',
};

export const validationSchema = Yup.object().shape({
  connectionType: Yup.string().nullable().required('Это поле обязательное'),
  calculatorId: Yup.string()
    .nullable()
    .when('connectionType', {
      is: CalculatorConnectionType.Connected,
      then: Yup.string().nullable().required('Это поле обязательное'),
    }),
  entryNumber: Yup.number()
    .nullable()
    .when('connectionType', {
      is: CalculatorConnectionType.Connected,
      then: Yup.number().nullable().required('Это поле обязательное'),
    }),
});
