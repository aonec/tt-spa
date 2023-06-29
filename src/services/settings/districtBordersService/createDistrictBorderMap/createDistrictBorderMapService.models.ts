import { forward } from 'effector';
import { createGate } from 'effector-react';
import {
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';
import { createForm } from 'effector-forms/dist';
import { DistrictColor } from 'types';

const CreateDistrictGate = createGate();

const createDistrictForm = createForm({
  fields: {
    isEditing: {
      init: true,
    },
    selectedHouses: {
      init: [] as number[],
    },
    name: { init: '' },
    color: { init: DistrictColor.Blue },
    formSection: {
      init: 0,
    },
  },
});

forward({
  from: CreateDistrictGate.open,
  to: [existingDistrictsQuery.start, existingHousingStocksQuery.start],
});

export const createDistrictBorderMapService = {
  gates: { CreateDistrictGate },
  forms: { createDistrictForm },
};
