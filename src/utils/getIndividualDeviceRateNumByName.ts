import { EIndividualDeviceRateType } from 'api/myApi';

export const getIndividualDeviceRateNumByName = (
  rateType: EIndividualDeviceRateType,
) => {
  const values = [
    EIndividualDeviceRateType.OneZone,
    EIndividualDeviceRateType.TwoZone,
    EIndividualDeviceRateType.ThreeZone,
  ];

  const res = values.reduce(
    (acc, elem, index) => (rateType === elem ? index + 1 : acc),
    1,
  );

  return res;
};
