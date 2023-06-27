import { forward } from 'effector';
import { createGate } from 'effector-react';
import {
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';

// const domain = createDomain('createDistrictBorderMapService');

const CreateDistrictGate = createGate();

forward({
  from: CreateDistrictGate.open,
  to: [existingDistrictsQuery.start, existingHousingStocksQuery.start],
});

export const createDistrictBorderMapService = {
  inputs: {},
  outputs: {},
  gates: { CreateDistrictGate },
};
