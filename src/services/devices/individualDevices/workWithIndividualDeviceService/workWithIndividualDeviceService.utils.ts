import moment from 'moment';
import {
  IndividualDeviceReadingsResponse,
  SwitchIndividualDeviceReadingsCreateRequest,
} from 'api/types';
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

export const compareReadingsArrWithSameIndex = (
  afterEditingArr: PreparedForFormReadings[],
  beforeEditiningArr: PreparedForFormReadings[],
) =>
  afterEditingArr.length
    ? afterEditingArr.reduce((acc, readings, index) => {
        const { value1, value2, value3, value4 } = readings;

        const oldReadings = beforeEditiningArr[index];

        const {
          value1: oldValue1,
          value2: oldValue2,
          value3: oldValue3,
          value4: oldValue4,
        } = oldReadings;

        const isDifferent =
          oldValue1 !== value1 ||
          oldValue2 !== value2 ||
          oldValue3 !== value3 ||
          oldValue4 !== value4;

        if (!isDifferent) {
          return acc;
        }

        return [...acc, getPreparedReadingsOfIndividualDevice(readings)];
      }, [] as SwitchIndividualDeviceReadingsCreateRequest[])
    : null;

const getPreparedReadingsOfIndividualDevice = (
  item: PreparedForFormReadings,
) => {
  const { readingDate, value1, value2, value3, value4 } = item;

  return {
    readingDate: moment(readingDate)
      .add(1, 'month')
      .utcOffset(0, true)
      .toISOString(),
    value1: Number(value1),
    value2: value2 ? Number(value2) : null,
    value3: value3 ? Number(value3) : null,
    value4: value4 ? Number(value4) : null,
  };
};
