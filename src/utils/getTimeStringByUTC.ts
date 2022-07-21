import moment from 'moment';

export function getTimeStringByUTC(
  dateString: string,
  format: string = 'DD.MM.YYYY HH:mm'
) {
  return moment.utc(dateString).local().format(format);
}
