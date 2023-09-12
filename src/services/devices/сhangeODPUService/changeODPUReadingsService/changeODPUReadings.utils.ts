import dayjs from 'api/dayjs';
import {
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  SwitchHousingDeviceReadingsCreateRequest,
} from 'api/types';
import { getFilledArray } from 'utils/getFilledArray';
import { PreparedHousingMeteringDeviceReadings } from './changeODPUReadingsService.types';
import { firstLetterToUpperCase } from 'utils/firstLetterToUpperCase';

export const prepareData = (
  readings: HousingMeteringDeviceReadingsIncludingPlacementResponse[],
) => {
  const dateFormat = 'YYYY-MM';
  const currentMonthDate = dayjs(
    dayjs().add(1, 'month').format(dateFormat),
    dateFormat,
  );
  const preparedArray = getFilledArray(7, (index) => {
    const text = firstLetterToUpperCase(
      dayjs(currentMonthDate).subtract(index, 'month').format('MMMM'),
    );

    return {
      text,
      id: text,
      value: null,
      nonResidentialRoomConsumption: null,
      readingDate: dayjs(currentMonthDate)
        .utcOffset(0, true)
        .subtract(index, 'month')
        .format(),
    };
  });

  return readings
    .reduce((acc, currentReading) => {
      const readingMonthDate = dayjs(
        dayjs(currentReading.readingDate).format(dateFormat),
      );

      const diff = currentMonthDate.diff(readingMonthDate, 'months');

      if (diff > 6 || currentReading.isRemoved || currentReading.isArchived)
        return acc;

      const id = currentReading.id;
      const currentReadingValue = String(currentReading.value);
      const currentNonResidentialRoomConsumption = String(
        currentReading.nonResidentialRoomConsumption,
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
      dayjs(secondReading.readingDate).diff(firstReading.readingDate),
    );
};

export const prepareReadingsToFormik = (
  readings: PreparedHousingMeteringDeviceReadings[],
  oldReadings: PreparedHousingMeteringDeviceReadings[],
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
          readingNonResidentialRoomConsumption,
        ),
      },
    ];
  }, [] as SwitchHousingDeviceReadingsCreateRequest[]);
