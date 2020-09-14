import moment from 'moment';
// библиотека обработки дат и локализация СНГ
// import 'moment/locale/ru';

// moment.locale('ru');

export function convertDate(date) {
  const dateAndTime = 'DD.MM.YYYY, hh:mm';
  const newDate = moment(date).format(dateAndTime);
  return newDate;
}

export function convertDateOnly(date) {
  const dateOnly = 'YYYY-MM-DD';
  const newDate = moment(date).format(dateOnly);
  return newDate;
}

export function convertDateDots(date) {
  const dateOnly = 'DD.MM.YYYY';
  const newDate = moment(date).format(dateOnly);
  return newDate;
}

export default convertDate;
