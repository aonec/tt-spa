import { sample } from 'effector';
import { createGate } from 'effector-react';
import { homeownerAccountQuery } from './editHomeownerPhoneNumberService.api';

const EditHomeownerAccountGate = createGate<{ id: string }>();

sample({
  clock: EditHomeownerAccountGate.open,
  fn: ({ id }) => id,
  target: homeownerAccountQuery.start,
});

export const editHomeownerPhoneNumberService = {
  inputs: {},
  outputs: {},
  gates: { EditHomeownerAccountGate },
};
