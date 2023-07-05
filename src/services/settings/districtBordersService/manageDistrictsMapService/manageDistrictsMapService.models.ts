import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { existingDistrictsQuery } from './manageDistrictsMapService.api';

const domain = createDomain('manageDistrictsMapService');

const ManageDistrictsGate = createGate();

const handleDeleteDistrict = domain.createEvent();

sample({
  clock: ManageDistrictsGate.open,
  target: existingDistrictsQuery.start,
});

export const manageDistrictsMapService = {
  inputs: { handleDeleteDistrict },
  outputs: {},
  gates: { ManageDistrictsGate },
};
