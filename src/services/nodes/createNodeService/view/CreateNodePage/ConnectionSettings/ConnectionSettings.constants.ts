import { CalculatorConnectionType } from './ConnectionSettings.types';

export const initialValues = {
  connectionType: null as CalculatorConnectionType | null,
  calculatorId: null as number | null,
  entryNumber: null as 1 | 2 | 3 | null,
};

export const ConnectionTypeDictionary: {
  [key in CalculatorConnectionType]: string;
} = {
  [CalculatorConnectionType.Connected]: 'Есть подключение',
  [CalculatorConnectionType.NoConnection]: 'Отстуствует',
};
