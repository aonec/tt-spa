import { IndividualDeviceReadingsResponse } from 'myApi';
import { EIndividualDeviceRateType } from 'myApi';
import { rateNums } from './MetersInputsBlock.constants';
import { BufferedReadingValues } from './MetersInputsBlock.types';

export function getRateNum(rateType: EIndividualDeviceRateType) {
  return rateNums[rateType];
}

export function getBufferedValuesFromReading(
  reading?: IndividualDeviceReadingsResponse
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
