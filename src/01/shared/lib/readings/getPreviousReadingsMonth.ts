import moment from 'moment';
import { firstLetterToUpperCase } from 'utils/firstLetterToUpperCase';

export const getPreviousReadingsMonth = (sliderIndex: number) => {
  const month = moment().subtract(sliderIndex, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};

export const getDateByReadingMonthSlider = (sliderIndex: number) => {
  return moment()
    .subtract(sliderIndex + 1, 'months')
    .set('D', 15);
};
