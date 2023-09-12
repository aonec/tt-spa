import dayjs from 'api/dayjs';

export const firstLetterToUpperCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getReadingsMonthByShift = (sliderIndex: number) => {
  const month = dayjs().subtract(sliderIndex, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};
