import moment from 'moment';

// библиотека обработки дат и локализация СНГ
import 'moment/locale/ru';

moment.locale('ru');

export function convertDate(date) {
  const dateAndTime = 'DD.MM.YYYY, hh:mm'
  const newDate = moment(date).format(dateAndTime);
  return newDate;
}
