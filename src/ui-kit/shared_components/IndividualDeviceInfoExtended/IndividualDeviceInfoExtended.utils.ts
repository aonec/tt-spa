import moment from 'moment';

export const prepareDateForDateLine = (date: string | null) => {
  if (date === null) {
    return null;
  }
  return moment(date).format('DD.MM.YYYY');
};
