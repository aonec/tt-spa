import { createDomain } from 'effector';
import { createGate } from 'effector-react';

const domain = createDomain('houseManagementsService');

const HouseManagementsGate = createGate();

export const houseManagementsService = {
  inputs: {},
  outputs: {},
  gates: {
    HouseManagementsGate,
  },
};
