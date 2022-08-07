import moment from 'moment';
import { IndividualDeviceReadingsResponse } from 'myApi';

export function getPreparedReadingsDictionary(
  readings: IndividualDeviceReadingsResponse[]
) {
  return readings.reduce((acc, elem) => {
    const dateFormat = 'YYYY-MM';

    const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
    const readingMonthDate = moment(
      moment(elem.readingDateTime).format(dateFormat)
    );

    if (currentMonthDate.diff(readingMonthDate, 'months') > 11) return acc;

    const index = currentMonthDate.diff(readingMonthDate, 'months') - 1;

    acc[index] = elem;

    return acc;
  }, {} as { [key: number]: IndividualDeviceReadingsResponse });
}
