import moment from 'moment';

// библиотека обработки дат и локализация СНГ
import 'moment/locale/ru';

moment.locale('ru');

export function convertDate(date) {
  const newDate = moment(date).format(
    'DD.MM.YYYY, hh:mm',
  );
  return newDate;
}
