import moment from 'time';
// библиотека обработки дат и локализация СНГ
// import 'moment/locale/ru';

// moment.locale('ru');

export function convertDate(date) {
  if (date === null) return '';
  const dateAndTime = 'DD.MM.YYYY, hh:mm';
  const newDate = moment(date).format(dateAndTime);
  return newDate;
}

export function convertDateOnly(date) {
  if (date === null) return '';
  const dateOnly = 'YYYY-MM-DD';
  const newDate = moment(date).format(dateOnly);
  return newDate;
}

export function convertDateDots(date) {
  if (date === null) return '';
  const dateOnly = 'DD.MM.YYYY';
  const newDate = moment(date).format(dateOnly);
  return newDate;
}

export default convertDate;
