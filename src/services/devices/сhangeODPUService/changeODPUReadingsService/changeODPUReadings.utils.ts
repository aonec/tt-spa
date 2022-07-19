import { firstLetterToUpperCase } from '01/utils/getMonthFromDate';
import moment from 'moment';
import {
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  SwitchHousingDeviceReadingsCreateRequest,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import { PreparedHousingMeteringDeviceReadings } from './changeODPUReadingsService.types';

export const prepareData = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[]
) => {
  const dateFormat = 'YYYY-MM';
  const currentMonthDate = moment(moment().format(dateFormat), dateFormat);
  const preparedArray = getFilledArray(7, (index) => {
    const text = firstLetterToUpperCase(
      moment(currentMonthDate)
        .subtract(index - 1, 'month')
        .format('MMMM')
    );

    return {
      text,
      id: text,
      value: null,
      nonResidentialRoomConsumption: null,
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

      const id = currentReading.id;
      const currentReadingValue = String(currentReading.value);
      const currentNonResidentialRoomConsumption = String(
        currentReading.nonResidentialRoomConsumption
      );
      const currentReadingDate = currentReading.readingDate;
      acc[diff] = {
        ...acc[diff],
        readingDate: currentReadingDate,
        value: currentReadingValue,
        nonResidentialRoomConsumption: currentNonResidentialRoomConsumption,
        id,
      };
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
    const readingValue = elem.value || oldReadings[index].value;
    const readingNonResidentialRoomConsumption =
      elem.nonResidentialRoomConsumption ||
      oldReadings[index].nonResidentialRoomConsumption;

    const isReadingValueNotChanged = readingValue === oldReadings[index].value;
    const isNonResidentialRoomConsumptionNotChanged =
      readingNonResidentialRoomConsumption ===
      oldReadings[index].nonResidentialRoomConsumption;

    if (isReadingValueNotChanged && isNonResidentialRoomConsumptionNotChanged) {
      return acc;
    }
    return [
      ...acc,
      {
        value: Number(readingValue),
        readingDate: elem.readingDate,
        nonResidentialRoomConsumption: Number(
          readingNonResidentialRoomConsumption
        ),
      },
    ];
  }, [] as SwitchHousingDeviceReadingsCreateRequest[]);
