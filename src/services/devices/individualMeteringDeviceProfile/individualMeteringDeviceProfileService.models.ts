import { sample } from 'effector';
import { createGate } from 'effector-react';
import { individualDeviceQuery } from './individualMeteringDeviceProfileService.api';

const IndividualDeviceGate = createGate<{ id: number }>();

sample({
  clock: IndividualDeviceGate.open,
  fn: ({ id }) => id,
  target: individualDeviceQuery.start,
});

export const individualMeteringDeviceProfileService = {
  gates: { IndividualDeviceGate },
};
