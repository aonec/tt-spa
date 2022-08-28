import moment from 'moment';

export const getPreparedDate = (date: string | null) => {
  if (!date) {
    return null;
  }

  return moment(date).format('DD.MM.YYYY');
};
