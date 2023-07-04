import moment from 'moment';
import { IndividualDeviceReadingsResponse } from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import { PreparedForFormReadings } from './workWithIndividualDeviceService.types';

export const prepareDeviceReadings = (
  readings: IndividualDeviceReadingsResponse[],
) => {
  const filteredReadings = readings.filter((elem) => !elem.isRemoved);

  const sortedReadings = filteredReadings
    .sort((first, second) =>
      moment(second.readingDate)
        .startOf('month')
        .diff(moment(first.readingDate).startOf('month'), 'month'),
    )
    .slice(0, 8);

  let readingsIndex = 0;
  const dateFormat = 'YYYY-MM';

  return getFilledArray(8, (index) => index).reduce((acc, _, index) => {
    const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
    const foundReading = sortedReadings?.[readingsIndex];
    const readingMonthDate = foundReading?.readingDate;

    if (!readingMonthDate) {
      acc[index - 1] = {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        readingDate: currentMonthDate
          .subtract(index, 'month')
          .format(dateFormat),
      };

      return acc;
    }

    const diff = currentMonthDate.diff(moment(readingMonthDate), 'months');

    if (diff !== index) {
      acc[index - 1] = {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        readingDate: currentMonthDate
          .subtract(index, 'month')
          .format(dateFormat),
      };
    } else {
      acc[index - 1] = {
        value1: foundReading.value1 || '',
        value2: foundReading.value2 || '',
        value3: foundReading.value3 || '',
        value4: foundReading.value4 || '',
        readingDate: foundReading.readingDate,
      };
      readingsIndex++;
    }

    return acc;
  }, {} as { [key: number]: PreparedForFormReadings });
};
