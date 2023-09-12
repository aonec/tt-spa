import dayjs from 'api/dayjs';

export function getTimeStringByUTC(
  dateString: string,
  format: string = 'DD.MM.YYYY HH:mm',
) {
  return dayjs(dateString).format(format);
}
