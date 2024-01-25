import dayjs from 'api/dayjs';

export const getDateByReadingMonthSlider = (sliderIndex: number) => {
  return dayjs()
    .subtract(sliderIndex + 1, 'months')
    .set('D', 15);
};
