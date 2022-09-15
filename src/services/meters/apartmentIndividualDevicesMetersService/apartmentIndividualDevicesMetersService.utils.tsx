import moment from "moment";

export const firstLetterToUpperCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getReadingsMonthByShift = (sliderIndex: number) => {
  const month = moment().subtract(sliderIndex, 'months').format('MMMM');

  return firstLetterToUpperCase(month);
};
