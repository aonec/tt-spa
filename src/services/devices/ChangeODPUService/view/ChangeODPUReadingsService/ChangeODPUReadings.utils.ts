import { firstLetterToUpperCase } from '01/utils/getMonthFromDate';
import moment from 'moment';
import {
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  SwitchHousingDeviceReadingsCreateRequest,
} from 'myApi';
import { PreparedHousingMeteringDeviceReadings } from './ChangeODPUReadingsService.types';

const getFilledArray = (length: number) => Array.from(Array(length).keys());

export const prepareData = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const dateFormat = 'YYYY-MM';
  const currentMonthDate = moment(moment().format(dateFormat), dateFormat);

  const preparedArray = getFilledArray(7).map((index) => {
    const text = firstLetterToUpperCase(
      moment(currentMonthDate)
        .subtract(index - 1, 'month')
        .format('MMMM')
    );

    return {
      text,
      value: null,
      readingDate: moment(currentMonthDate).subtract(index, 'month').format(),
    };
  });

  return readings
    .reduce((acc, currentReading) => {
      const readingMonthDate = moment(
        moment(currentReading.readingDate).format(dateFormat)
      );

      const diff = currentMonthDate.diff(readingMonthDate, 'months');

      if (diff > 6 || currentReading.isRemoved || currentReading.isArchived)
        return acc;

      const id = currentReading.id || acc[diff].text;

      acc[diff] = { ...acc[diff], ...currentReading, id };
      return acc;
    }, preparedArray as PreparedHousingMeteringDeviceReadings[])
    .sort((firstReading, secondReading) =>
      moment(secondReading.readingDate).diff(firstReading.readingDate)
    );
};

export const prepareReadingsToFormik = (
  readings: PreparedHousingMeteringDeviceReadings[],
  oldReadings: PreparedHousingMeteringDeviceReadings[]
): SwitchHousingDeviceReadingsCreateRequest[] =>
  readings.reduce((acc, elem, index) => {
    if (elem.value === oldReadings[index].value || elem.value === null)
      return acc;
    return [...acc, { value: elem.value, readingDate: elem.readingDate }];
  }, [] as SwitchHousingDeviceReadingsCreateRequest[]);
