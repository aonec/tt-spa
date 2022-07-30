import moment from 'moment';
import { firstLetterToUpperCase } from '../../../../utils/getMonthFromDate';

export const getReadingMonth = (readingDate: string) => {
  const month = moment(readingDate).subtract(-1, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};
