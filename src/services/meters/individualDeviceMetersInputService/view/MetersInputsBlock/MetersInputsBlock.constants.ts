import { EIndividualDeviceRateType } from 'myApi';

export const rateNums: {
  [key in EIndividualDeviceRateType]: number;
} = {
  [EIndividualDeviceRateType.OneZone]: 1,
  [EIndividualDeviceRateType.TwoZone]: 2,
  [EIndividualDeviceRateType.ThreeZone]: 3,
};
