import moment from 'moment';

export const getPreparedDate = (date: string | null) => {
  if (!date) {
    return '-';
  }

  return moment(date).format('DD.MM.YYYY');
};
