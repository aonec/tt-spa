import { EDayPartError } from './view/TemperatureGraph/TemperatureGraph.types';

export const ColumnErrDictionary = {
  'Дневной норматив': [EDayPartError.day],
  'Ночной норматив': [EDayPartError.night],
  'Дневной и ночной нормативы': [EDayPartError.day, EDayPartError.night],
};

export type ErrorColumnType = {
  [outdoorTemperature: number]: EDayPartError[];
};

export type TemperatureLimitsType = {
  min: number | null;
  max: number | null;
};
