import dayjs from 'api/dayjs';

export const prepareDateForDateLine = (date: string | null) => {
  if (date === null) {
    return null;
  }
  return dayjs(date).format('DD.MM.YYYY');
};
