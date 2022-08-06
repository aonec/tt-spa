import { EIndividualDeviceRateType } from 'myApi';
import { rateNums } from './MetersInputsBlock.constants';

export function getRateNum(rateType: EIndividualDeviceRateType) {
  return rateNums[rateType];
}
