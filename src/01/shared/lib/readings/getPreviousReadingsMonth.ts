import moment from 'moment';
import { firstLetterToUpperCase } from '../../../utils/getMonthFromDate';

export const getPreviousReadingsMonth = (sliderIndex: number) => {
  const month = moment().subtract(sliderIndex, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};

export const getDateByReadingMonthSlider = (sliderIndex: number) => {
  const date = moment().subtract(sliderIndex + 1, 'months');

  date.set('day', 15);

  return date;
};
