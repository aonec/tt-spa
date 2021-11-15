import moment from 'moment';
import { IndividualDeviceReadingsItemHistoryResponse } from './../../../../myApi';

export const getReadingValuesArray = (
  reading: IndividualDeviceReadingsItemHistoryResponse,
  type: 'consumption' | 'value' | 'averageConsumption',
  rateNum: number
) => {
  const res: (string | null)[] = [];

  for (let i = 0; i < rateNum; i++)
    res.push((reading as any)[`${type}${i + 1}`]);

  return res;
};

export const getMonthName = (month: number) =>
  moment()
    .month(month - 1)
    .format('MMMM');

export const getReadingValuesObject = (
  reading: IndividualDeviceReadingsItemHistoryResponse,
  rateNum: number
) => {
  const res: { [key: string]: number } = {};

  for (let i = 0; i < rateNum; i++) {
    const index = `value${i + 1}`;

    res[index] = Number(((reading as any)[index] as string).split(' ')[0]) || 0;
  }
  return res;
};
