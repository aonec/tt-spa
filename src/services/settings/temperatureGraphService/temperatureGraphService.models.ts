import { createStore, createEvent, createEffect, sample } from 'effector';
import { createGate } from 'effector-react';
import { sortBy } from 'lodash';
import { message } from 'antd';
import {
  getTemperatureNormative,
  putTemperatureNormative,
} from './temperatureGraphService.api';
import {
  TemperatureNormativeResponse,
  TemperatureNormativeRow,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';

const TemperatureGraphGate = createGate();

const handleEditTemperatureNormative = createEvent<boolean>();

const setEditedTemperatureNormative =
  createEvent<TemperatureNormativeUpdateRequest>();

const getTemperatureNormativeFx = createEffect<
  void,
  TemperatureNormativeResponse
>(getTemperatureNormative);

const putTemperatureNormativeFx = createEffect<
  TemperatureNormativeUpdateRequest,
  TemperatureNormativeResponse,
  EffectFailDataAxiosError
>(putTemperatureNormative);

const $temperatureNormative = createStore<TemperatureNormativeRow[]>([])
  .on(getTemperatureNormativeFx.doneData, (_, normativeData) => {
    const rowsArr = normativeData.rows || [];
    return sortBy(rowsArr, (rowData) => {
      if (rowData.outdoorTemperature || rowData.outdoorTemperature === 0) {
        return rowData.outdoorTemperature * -1;
      } else {
        return null;
      }
    });
  })
  .on(putTemperatureNormativeFx.doneData, (_, normativeData) => {
    const rowsArr = normativeData.rows || [];
    return sortBy(rowsArr, (rowData) => {
      if (rowData.outdoorTemperature || rowData.outdoorTemperature === 0) {
        return rowData.outdoorTemperature * -1;
      } else {
        return null;
      }
    });
  });

const $editedTemperatureNormative =
  createStore<TemperatureNormativeUpdateRequest | null>(null).on(
    setEditedTemperatureNormative,
    (_, data) => data,
  );

const $isEditing = createStore<boolean>(false)
  .on(handleEditTemperatureNormative, (_, isEdit) => isEdit)
  .on(putTemperatureNormativeFx.doneData, () => false)
  .reset(TemperatureGraphGate.close);

const $isLoading = putTemperatureNormativeFx.pending;

sample({ clock: TemperatureGraphGate.open, target: getTemperatureNormativeFx });

sample({
  clock: $editedTemperatureNormative,
  filter: Boolean,
  target: putTemperatureNormativeFx,
});

putTemperatureNormativeFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const temperatureGraphService = {
  inputs: { handleEditTemperatureNormative, setEditedTemperatureNormative },
  outputs: { $temperatureNormative, $isEditing, $isLoading },
  gates: { TemperatureGraphGate },
};
