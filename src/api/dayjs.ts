import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import ru from 'dayjs/locale/ru';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.locale(ru);

export default dayjs;
