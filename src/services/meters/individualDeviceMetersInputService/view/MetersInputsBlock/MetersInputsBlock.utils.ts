import dayjs from 'api/dayjs';
import {
  IndividualDeviceReadingsResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';
import { EIndividualDeviceRateType } from 'api/types';
import { rateNums } from './MetersInputsBlock.constants';
import { BufferedReadingValues } from './MetersInputsBlock.types';

export function getRateNum(rateType: EIndividualDeviceRateType) {
  return rateNums[rateType];
}

export function getBufferedValuesFromReading(
  reading?:
    | IndividualDeviceReadingsResponse
    | IndividualDeviceReadingsSlimResponse
    | null,
): BufferedReadingValues {
  const { value1, value2, value3 } = reading || {};

  return {
    value1: value1 || '',
    value2: value2 || '',
    value3: value3 || '',
  };
}

export function getBufferedValuesValueKey(index: number) {
  return `value${index + 1}` as keyof BufferedReadingValues;
}

export const getDateByReadingMonthSlider = (sliderIndex: number) => {
  return dayjs()
    .subtract(sliderIndex + 1, 'months')
    .set('D', 15)
    .format();
};
