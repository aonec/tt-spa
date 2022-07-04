import moment from 'time';

export function formatDate(date: moment.Moment) {
  return date.format('YYYY-MM-DD');
}
