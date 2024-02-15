import { createStore, createEvent, createEffect, sample } from 'effector';
import { createGate } from 'effector-react';
import { sortBy } from 'lodash';
import { message } from 'antd';
import {
  getTemperatureNormative,
  createOrUpdateTemperatureNormative,
  getTemplateFile,
} from './temperatureGraphService.api';
import {
  TemperatureNormativeResponse,
  TemperatureNormativeRow,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import { EffectFailDataAxiosErrorDataTemperatureGraph } from 'types';
import { EDayPartError } from './view/TemperatureGraph/TemperatureGraph.types';
import { ErrorColumnType } from './temperatureGraphService.types';

const TemperatureGraphGate = createGate();

const handleEditTemperatureNormative = createEvent<boolean>();

const handleGetTemplateFile = createEvent();

const setModalOpen = createEvent<boolean>();

const setEditedTemperatureNormative =
  createEvent<TemperatureNormativeUpdateRequest>();

const getTemperatureNormativeFx = createEffect<
  void,
  TemperatureNormativeResponse
>(getTemperatureNormative);

const updateTemperatureNormativeFx = createEffect<
  TemperatureNormativeUpdateRequest,
  TemperatureNormativeResponse,
  EffectFailDataAxiosErrorDataTemperatureGraph
>(createOrUpdateTemperatureNormative);

const getTemplateFileFx = createEffect(getTemplateFile);

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
  .on(updateTemperatureNormativeFx.doneData, (_, normativeData) => {
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
  .on(updateTemperatureNormativeFx.doneData, () => false)
  .reset(TemperatureGraphGate.close);

const $errorColumns = createStore<ErrorColumnType[]>([]).on(
  updateTemperatureNormativeFx.failData,
  (_, error) => {
    const errorsArr = Object.entries(error.response.data.error.Data);
    const preparedErrorsArr = errorsArr.map((err) => {
      const dayPart = err[1].DayPart;

      let dayPartError = [] as EDayPartError[];

      if (dayPart === 'Дневной норматив') {
        dayPartError = [EDayPartError.day];
      }
      if (dayPart === 'Ночной норматив') {
        dayPartError = [EDayPartError.night];
      }
      if (dayPart === 'Дневной и ночной нормативы') {
        dayPartError = [EDayPartError.day, EDayPartError.night];
      }

      return {
        [Number(err[0])]: dayPartError,
      };
    });

    return preparedErrorsArr;
  },
);

const $isLoading = updateTemperatureNormativeFx.pending;

const $isModalOpen = createStore<boolean>(false).on(
  setModalOpen,
  (_, data) => data,
);

sample({ clock: TemperatureGraphGate.open, target: getTemperatureNormativeFx });

sample({
  clock: $editedTemperatureNormative,
  filter: Boolean,
  target: updateTemperatureNormativeFx,
});

sample({
  clock: handleGetTemplateFile,
  target: getTemplateFileFx,
});

updateTemperatureNormativeFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const temperatureGraphService = {
  inputs: {
    handleEditTemperatureNormative,
    setEditedTemperatureNormative,
    setModalOpen,
    handleGetTemplateFile,
  },
  outputs: {
    $temperatureNormative,
    $isEditing,
    $isLoading,
    $errorColumns,
    $isModalOpen,
  },
  gates: { TemperatureGraphGate },
};
