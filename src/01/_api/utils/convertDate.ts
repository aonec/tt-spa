import moment from 'moment';

export function convertDate(date: string | null) {
  if (date === null) return '';
  const dateAndTime = 'DD.MM.YYYY, hh:mm';
  const newDate = moment(date).format(dateAndTime);
  return newDate;
}
