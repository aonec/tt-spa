import moment from 'moment';
import {
  IndividualDeviceReadingsResponse,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsCreateRequest,
} from 'myApi';
import { getFilledArray } from 'utils/getFilledArray';
import {
  CompareReadingsStatus,
  CompareReadingsResult,
  PreparedReadingsData,
  ReadingLite,
} from './individualDeviceMetersInputService.types';
import { getRateNum } from './view/MetersInputsBlock/MetersInputsBlock.utils';
import { MangingFirmsConsumptionRatesDictionary } from '../managementFirmConsumptionRatesService/managementFirmConsumptionRatesService.types';
import { nextReadingIndexLimit } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';
import { previousReadingIndexLimit } from '../apartmentIndividualDevicesMetersService/apartmentIndividualDevicesMetersService.constants';

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
  createMeterPayload: IndividualDeviceReadingsCreateRequest,
  rateNum: number,
  consumptionRates: MangingFirmsConsumptionRatesDictionary,
  readings: PreparedReadingsData
) {
  const nextReading = getExistingReading(readings, meterIndex, 'next');
  const previousReading = getExistingReading(readings, meterIndex, 'prev');

  if (!nextReading || !previousReading) return null;

  const uploadingReadingLite = getReadingLite(createMeterPayload, rateNum);
  const nextReadingLite = getReadingLite(previousReading, rateNum);
  const previousReadingLite = getReadingLite(nextReading, rateNum);

  const prevReadingCompareResult = compareReadings(
    previousReadingLite,
    uploadingReadingLite,
    rateNum,
    'prev'
  );

  const nextReadingCompareResult = compareReadings(
    uploadingReadingLite,
    nextReadingLite,
    rateNum,
    'next'
  );

  return { prevReadingCompareResult, nextReadingCompareResult };
}

function getExistingReading(
  readings: PreparedReadingsData,
  index: number,
  type: 'next' | 'prev'
) {
  while (
    (type === 'next' && index >= nextReadingIndexLimit) ||
    (type === 'prev' && index <= previousReadingIndexLimit)
  ) {
    const reading = readings[index];

    if (reading) return readings[index];

    type === 'next' ? index-- : index++;
  }
}

function compareReadings(
  reading1: ReadingLite,
  reading2: ReadingLite,
  rateNum: number,
  type: 'next' | 'prev'
): CompareReadingsResult | undefined {
  const preparedReadingsCompareArray = getFilledArray(rateNum, (index) => {
    const valueKey = getReadingValueKey(index);

    return {
      value1: reading1[valueKey],
      value2: reading2[valueKey],
    };
  });

  const compareResult = preparedReadingsCompareArray.reduce(
    (acc, elem, index) => {
      const result: CompareReadingsResult = {
        valueIndex: index,
        result: CompareReadingsStatus.Ok,
      };

      const isBothValueExist = checkIsBothValuesExist(elem);

      if (!isBothValueExist) return acc;

      if (type === 'next' && elem.value1! > elem.value2!) {
        result.result = CompareReadingsStatus.LeftGreater;
      }

      if (type === 'prev' && elem.value1! < elem.value2!) {
        result.result = CompareReadingsStatus.RightLess;
      }

      if (result.result === CompareReadingsStatus.Ok) return acc;

      return [...acc, { ...result, diff: elem.value2! - elem.value1! }];
    },
    [] as CompareReadingsResult[]
  );

  return compareResult[0];
}

function checkIsBothValuesExist(values: {
  value1: number | null;
  value2: number | null;
}): values is { value1: number; value2: number } {
  return Boolean(values.value1 && values.value2);
}

function getReadingLite(
  reading:
    | IndividualDeviceReadingsResponse
    | IndividualDeviceReadingsCreateRequest,
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

function getReadingValueKey(index: number) {
  return `value${index + 1}` as keyof ReadingLite;
}
