import dayjs from 'api/dayjs';

export const getPreparedDate = (date: string | null) => {
  if (!date) {
    return '-';
  }

  return dayjs(date).format('DD.MM.YYYY');
};
