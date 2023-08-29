import { createDomain, sample } from 'effector';
import { getTemperatureNormative } from './temperatureGraphService.api';
import {
  TemperatureNormativeResponse,
  TemperatureNormativeRow,
} from 'api/types';
import { createGate } from 'effector-react';
import { sortBy } from 'lodash';

const domain = createDomain('temperatureGraphService');

const TemperatureGraphGate = createGate();

const handleEditTemperatureNormative = domain.createEvent<boolean>();

const getTemperatureNormativeFx = domain.createEffect<
  void,
  TemperatureNormativeResponse
>(getTemperatureNormative);

const $temperatureNormative = domain
  .createStore<TemperatureNormativeRow[]>([])
  .on(getTemperatureNormativeFx.doneData, (_, normativeData) => {
    const rowsArr = normativeData.rows || [];
    return sortBy(rowsArr, (rowData) => {
      if (rowData.outdoorTemperature || rowData.outdoorTemperature === 0) {
        return rowData.outdoorTemperature * -1;
      } else {
        return null;
      }
    });
  });

const $isEditing = domain
  .createStore<boolean>(false)
  .on(handleEditTemperatureNormative, (_, isEdit) => isEdit)
  .reset(TemperatureGraphGate.close);

sample({ clock: TemperatureGraphGate.open, target: getTemperatureNormativeFx });

export const temperatureGraphService = {
  inputs: { handleEditTemperatureNormative },
  outputs: { $temperatureNormative, $isEditing },
  gates: { TemperatureGraphGate },
};
