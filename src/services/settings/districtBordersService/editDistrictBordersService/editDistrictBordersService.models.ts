// import { createDomain } from 'effector';

import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './editDistrictBordersService.api';

// const domain = createDomain('editDistrictBordersService');

const DistrictBordersGate = createGate();

sample({
  clock: DistrictBordersGate.open,
  target: [existingHousingStocksQuery.start, existingDistrictsQuery.start],
});

export const editDistrictBordersService = {
  inputs: {},
  outputs: {},
  gates: { DistrictBordersGate },
};
