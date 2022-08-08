import moment from 'moment';
import {
  IndividualDeviceReadingsResponse,
  IndividualDeviceListItemResponse,
  ConsumptionRateResponse,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import {
  CompareReadingsStatus,
  ValidationReadingsResult,
  PreparedReadingsData,
  ReadingLite,
  MeterInputUploadReadingPayload,
} from './individualDeviceMetersInputService.types';
import { getRateNum } from './view/MetersInputsBlock/MetersInputsBlock.utils';
import { nextReadingIndexLimit } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import { previousReadingIndexLimit } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import { BufferedReadingValues } from './view/MetersInputsBlock/MetersInputsBlock.types';
import { round } from 'utils/round';

export function getPreparedReadingsDictionary(
  readings: IndividualDeviceReadingsResponse[]
): PreparedReadingsData {
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
  }, {} as PreparedReadingsData);
}

export const getInputIndex = (
  deviceIndex: number,
  devices: IndividualDeviceListItemResponse[],
  filterClosed?: boolean
) => {
  const devicesList = filterClosed
    ? devices
    : devices.filter((device) => device.closingDate === null);

  return devicesList
    .slice(0, deviceIndex)
    .filter((elem) => elem.closingDate === null)
    .reduce((acc, elem) => acc + getRateNum(elem.rateType), 0);
};

export function validateReadings(
  meterIndex: number,
  rateNum: number,
  createMeterPayload: MeterInputUploadReadingPayload,
  consumptionRate: ConsumptionRateResponse | null,
  readings: PreparedReadingsData
) {
  const previousReading = getExistingReading(readings, meterIndex, 'prev');
  const nextReading = getExistingReading(readings, meterIndex, 'next');

  const uploadingReadingLite = getReadingLite(createMeterPayload, rateNum);

  const previousReadingLite =
    previousReading && getReadingLite(previousReading, rateNum);

  const nextReadingLite = nextReading && getReadingLite(nextReading, rateNum);

  const readingsCompareResult = compareReadings(
    rateNum,
    uploadingReadingLite,
    previousReadingLite,
    nextReadingLite
  );

  if (readingsCompareResult) return readingsCompareResult;

  const checkReadingLimitsResult =
    consumptionRate &&
    previousReadingLite &&
    checkReadingLimits(
      previousReadingLite,
      uploadingReadingLite,
      consumptionRate,
      rateNum
    );

  if (checkReadingLimitsResult) return checkReadingLimitsResult;

  return null;
}

function getExistingReading(
  readings: PreparedReadingsData,
  index: number,
  type: 'next' | 'prev'
) {
  const nextIndex = () => (type === 'next' ? index-- : index++);

  nextIndex();

  while (
    (type === 'next' && index >= nextReadingIndexLimit) ||
    (type === 'prev' && index <= previousReadingIndexLimit)
  ) {
    const reading = readings[index];

    if (reading) return readings[index];

    nextIndex();
  }
}

function checkReadingLimits(
  prevReading: ReadingLite,
  nextReading: ReadingLite,
  consumptionRate: ConsumptionRateResponse,
  rateNum: number
): ValidationReadingsResult | undefined {
  return getFilledArray(rateNum, (index) => ({
    nextReading: nextReading[getReadingValueKey(index)] || 0,
    prevReading: prevReading[getReadingValueKey(index)] || 0,
  })).reduce((acc, { prevReading, nextReading }, index) => {
    if (
      nextReading - prevReading >
      (consumptionRate.maximumConsumptionRate || 0)
    ) {
      return [
        ...acc,
        {
          valueIndex: index,
          limitsConsumptionDiff: nextReading - prevReading,
          limit: consumptionRate.maximumConsumptionRate || 0,
        },
      ];
    }

    return acc;
  }, [] as ValidationReadingsResult[])[0];
}

function compareReadings(
  rateNum: number,
  uploadingReading: ReadingLite,
  prevReading?: ReadingLite,
  nextReading?: ReadingLite
): ValidationReadingsResult | undefined {
  const preparedReadingsCompareArray = getFilledArray(rateNum, (index) => {
    const valueKey = getReadingValueKey(index);

    return {
      uploadingValue: uploadingReading[valueKey] || 0,
      prevValue: prevReading?.[valueKey] || 0,
      nextValue: nextReading?.[valueKey] || Infinity,
    };
  });

  const compareResult = preparedReadingsCompareArray.reduce(
    (acc, elem, index) => {
      const result: ValidationReadingsResult = {
        valueIndex: index,
      };

      if (elem.prevValue > elem.uploadingValue) {
        result.compareStatus = CompareReadingsStatus.LeftGreater;
        result.compareDiff = elem.prevValue - elem.uploadingValue;
      }

      if (elem.uploadingValue > elem.nextValue) {
        result.compareStatus = CompareReadingsStatus.RightLess;
        result.compareDiff = elem.uploadingValue - elem.nextValue;
      }

      if (!result.compareStatus) return acc;

      return [...acc, { ...result, diff: round(result.compareDiff || 0, 3) }];
    },
    [] as ValidationReadingsResult[]
  );

  return compareResult[0];
}

export function getReadingLite(
  reading:
    | IndividualDeviceReadingsResponse
    | MeterInputUploadReadingPayload
    | BufferedReadingValues,
  rateNum: number
): ReadingLite {
  return getFilledArray(rateNum, (index) => {
    const valueKey = getReadingValueKey(index);

    const value = reading[valueKey];

    return value ? Number(value) : null;
  }).reduce(
    (acc, elem, index) => ({ ...acc, [getReadingValueKey(index)]: elem }),
    {} as ReadingLite
  );
}

export function getReadingValueKey(index: number) {
  return `value${index + 1}` as keyof ReadingLite;
}

export function getMeasurementUnit(resource: any) {
  return resource === 'Electricity' ? 'кВтч' : 'м³';
}
