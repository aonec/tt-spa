import { sample } from 'effector';
import { createGate } from 'effector-react';
import { organizationsQuery } from './organizationsService.api';

const OrganizationsGate = createGate();

sample({
  clock: OrganizationsGate.open,
  target: organizationsQuery.start,
});

export const organizationsService = {
  inputs: {},
  outputs: {},
  gates: { OrganizationsGate },
};
