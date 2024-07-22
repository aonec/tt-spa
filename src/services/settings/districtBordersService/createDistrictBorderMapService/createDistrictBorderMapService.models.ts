import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { message } from 'antd';
import { DistrictColor } from 'types';
import {
  createDistrictMutation,
  existingDistrictsQuery,
  existingHousingStocksQuery,
} from './createDistrictBorderMapService.api';
import { CreatingDistrictPayload } from './createDistrictBorderMapService.types';
import { currentOrganizationService } from 'services/currentOrganizationService';

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

const setDistrictPayload = createEvent<CreatingDistrictPayload>();

const $preselectedDistrictPayload = createStore<CreatingDistrictPayload | null>(
  null,
)
  .on(setDistrictPayload, (_, data) => data)
  .reset(CreateDistrictGate.close);

sample({
  clock: setDistrictPayload,
  fn: ({ housingStockIds }) => housingStockIds,
  target: createDistrictForm.fields.selectedHouses.set,
});

sample({
  clock: setDistrictPayload,
  fn: () => false,
  target: createDistrictForm.fields.isEditing.set,
});

sample({
  clock: CreateDistrictGate.open,
  target: [existingDistrictsQuery.start, existingHousingStocksQuery.start],
});

createDistrictMutation.finished.success.watch(() => {
  message.success('Район успешно создан');
});

createDistrictMutation.finished.failure.watch((e) => {
  const error = e.error.response.data.error;

  message.error(error.Text || error.Message);
});

export const createDistrictBorderMapService = {
  inputs: { setDistrictPayload },
  outputs: {
    $preselectedDistrictPayload,
    $organizationCoordinates:
      currentOrganizationService.outputs.$organizationCoordinates,
  },
  gates: { CreateDistrictGate },
  forms: { createDistrictForm },
};
