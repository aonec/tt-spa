import dayjs from 'api/dayjs';
import { IndividualDeviceReadingsItemHistoryResponse } from 'api/types';

export const getReadingValuesArray = (
  reading: IndividualDeviceReadingsItemHistoryResponse,
  type: 'consumption' | 'value' | 'averageConsumption',
  rateNum: number,
) => {
  const res: (string | null)[] = [];

  for (let i = 0; i < rateNum; i++) {
    const key = `${type}${
      i + 1
    }` as keyof IndividualDeviceReadingsItemHistoryResponse;

    const value = reading[key];

    if (typeof value === 'string' || value === null) {
      res.push(value);
    } else {
      // Если значение не строка, добавляем null или другую обработку
      res.push(null);
    }
  }

  return res;
};

export const getMonthName = (month: number) =>
  dayjs()
    .month(month - 1)
    .format('MMMM');

export const getReadingValuesObject = (
  values: (number | null)[],
  rateNum: number,
) => {
  const res: { [key: string]: number | null } = {};

  for (let i = 0; i < rateNum; i++) {
    const index = `value${i + 1}`;

    res[index] = values[i];
  }
  return res;
};
