import moment from 'moment';
import { IndividualDeviceReadingsItemHistoryResponse } from './../../../../myApi';

export const getReadingValuesArray = (
  reading: IndividualDeviceReadingsItemHistoryResponse,
  type: 'consumption' | 'value',
  rateNum: number
) => {
  const res: (string | null)[] = [];

  for (let i = 0; i < rateNum; i++)
    res.push((reading as any)[`${type}${i + 1}`]);
  return res;
};

export const getMonthName = (month: number) =>
  moment().subtract(month, 'months').format('MMMM');
