import { firstLetterToUpperCase } from '01/utils/getMonthFromDate';
import moment from 'moment';

export const getReadingMonth = (readingDate: string) => {
  const month = moment(readingDate).subtract(-1, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};
