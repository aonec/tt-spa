import moment from 'moment';

export const getDateByReadingMonthSlider = (sliderIndex: number) => {
  return moment()
    .subtract(sliderIndex + 1, 'months')
    .set('D', 15);
};
