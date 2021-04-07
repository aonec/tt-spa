import moment from 'moment';
import { firstLetterToUpperCase } from '../../../utils/getMonthFromDate';

export const getPreviousReadingsMonth = (sliderIndex: number) => {
  const month = moment()
    .subtract(sliderIndex + 1, 'months')
    .format('MMMM');

  return firstLetterToUpperCase(month);
};
