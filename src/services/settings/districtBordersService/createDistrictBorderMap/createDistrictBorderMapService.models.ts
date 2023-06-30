import { forward } from 'effector';
import { createGate } from 'effector-react';
import {
  createDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';
import { createForm } from 'effector-forms';
import { DistrictColor } from 'types';
import { message } from 'antd';

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
  from: [createDistrictMutation.finished.success, CreateDistrictGate.close],
  to: createDistrictForm.resetValues,
});

forward({
  from: CreateDistrictGate.open,
  to: [existingDistrictsQuery.start, existingHousingStocksQuery.start],
});

createDistrictMutation.finished.success.watch(() => {
  message.success('Район успешно создан');
});

createDistrictMutation.finished.failure.watch((e) => {
  const error = e.error.response.data.error;

  message.error(error.Text || error.Message);
});

export const createDistrictBorderMapService = {
  gates: { CreateDistrictGate },
  forms: { createDistrictForm },
};
