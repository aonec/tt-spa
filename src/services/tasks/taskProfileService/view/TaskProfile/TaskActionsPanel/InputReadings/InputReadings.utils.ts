import dayjs from 'api/dayjs';
import { firstLetterToUpperCase } from 'utils/firstLetterToUpperCase';

export const getReadingMonth = (readingDate: string) => {
  const month = dayjs(readingDate).subtract(-1, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};
