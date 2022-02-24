import moment from 'moment';

export function formatDate(date: moment.Moment) {
  return date.format('YYYY-MM-DD');
}
