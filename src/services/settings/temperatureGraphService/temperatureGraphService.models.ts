import { createStore, createEvent, createEffect, sample } from 'effector';
import { createGate } from 'effector-react';
import { sortBy } from 'lodash';
import { message } from 'antd';
import {
  getTemperatureNormative,
  createOrUpdateTemperatureNormative,
  getTemplateFile,
  createOrUpdateFromFile,
  deleteTemperatureNormativesMutation,
} from './temperatureGraphService.api';
import {
  TemperatureNormativeDeleteRequest,
  TemperatureNormativeResponse,
  TemperatureNormativeRow,
  TemperatureNormativeRowUpdate,
  TemperatureNormativeUpdateRequest,
} from 'api/types';
import { EffectFailDataAxiosErrorDataTemperatureGraph } from 'types';
import { EDayPartError } from './view/TemperatureGraph/TemperatureGraph.types';
import {
  ErrorColumnType,
  TemperatureLimitsType,
} from './temperatureGraphService.types';

const TemperatureGraphGate = createGate();

const handleEditTemperatureNormative = createEvent<boolean>();

const handleGetTemplateFile = createEvent();

const handlePostTemplateFile = createEvent<File>();

const setUploadModalOpen = createEvent<boolean>();

const setEditDeviationModalOpen = createEvent<boolean>();

const toggleDeletingRows = createEvent<number | null>();

const handleDeleteRows = createEvent();

const handleCreateRow = createEvent<TemperatureNormativeRowUpdate>();

const setEditedTemperatureNormative =
  createEvent<TemperatureNormativeUpdateRequest>();

const setFile = createEvent<File | null>();

const getTemperatureNormativeFx = createEffect<
  void,
  TemperatureNormativeResponse
>(getTemperatureNormative);

const updateTemperatureNormativeFx = createEffect<
  TemperatureNormativeUpdateRequest,
  TemperatureNormativeResponse,
  EffectFailDataAxiosErrorDataTemperatureGraph
>(createOrUpdateTemperatureNormative);

const createOrUpdateFromFileFx = createEffect<
  File,
  TemperatureNormativeResponse,
  EffectFailDataAxiosErrorDataTemperatureGraph
>(createOrUpdateFromFile);

const handleSuccessUpdateFromFile = createOrUpdateFromFileFx.doneData;

const getTemplateFileFx = createEffect(getTemplateFile);

const $temperatureLimits = createStore<TemperatureLimitsType>({
  min: null,
  max: null,
}).on(
  [updateTemperatureNormativeFx.doneData, getTemperatureNormativeFx.doneData],
  (
    _,
    {
      downTemperatureDeviationPercentLimit,
      upTemperatureDeviationPercentLimit,
    },
  ) => ({
    min: upTemperatureDeviationPercentLimit,
    max: downTemperatureDeviationPercentLimit,
  }),
);

const $temperatureNormative = createStore<TemperatureNormativeRow[]>([]).on(
  [
    handleSuccessUpdateFromFile,
    updateTemperatureNormativeFx.doneData,
    getTemperatureNormativeFx.doneData,
  ],
  (_, normativeDataFromFile) => {
    const rowsArr = normativeDataFromFile.rows || [];
    return sortBy(rowsArr, (rowData) => {
      if (rowData.outdoorTemperature || rowData.outdoorTemperature === 0) {
        return rowData.outdoorTemperature * -1;
      } else {
        return null;
      }
    });
  },
);

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

const $deletingRowIds = createStore<number[]>([])
  .on(toggleDeletingRows, (prev, id) => {
    if (typeof id !== 'number') return [];

    return prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id];
  })
  .reset(deleteTemperatureNormativesMutation.finished.success);

const $isLoading = updateTemperatureNormativeFx.pending;

const $isFileLoading = createOrUpdateFromFileFx.pending;

const $isUploadModalOpen = createStore<boolean>(false)
  .on(setUploadModalOpen, (_, data) => data)
  .reset(handleSuccessUpdateFromFile);

const $isDeviationEditModalOpen = createStore<boolean>(false)
  .on(setEditDeviationModalOpen, (_, data) => data)
  .reset(updateTemperatureNormativeFx.doneData);

const $file = createStore<File | null>(null)
  .on(setFile, (_, file) => file)
  .reset(handleSuccessUpdateFromFile);

sample({
  clock: [
    TemperatureGraphGate.open,
    deleteTemperatureNormativesMutation.finished.success,
  ],
  target: getTemperatureNormativeFx,
});

sample({
  clock: $editedTemperatureNormative,
  filter: Boolean,
  target: updateTemperatureNormativeFx,
});

sample({
  clock: handleCreateRow,
  fn: (newRowPayload): TemperatureNormativeUpdateRequest => ({
    updateRows: [newRowPayload],
  }),
  target: updateTemperatureNormativeFx,
});

sample({
  clock: handleGetTemplateFile,
  target: getTemplateFileFx,
});

sample({
  clock: handlePostTemplateFile,
  target: createOrUpdateFromFileFx,
});

updateTemperatureNormativeFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

createOrUpdateFromFileFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

sample({
  source: $deletingRowIds,
  clock: handleDeleteRows,
  fn: (ids): TemperatureNormativeDeleteRequest => ({
    outdoorTemperatures: ids,
  }),
  target: deleteTemperatureNormativesMutation.start,
});

deleteTemperatureNormativesMutation.finished.success.watch(() => {
  message.success('Удалено!');
});

export const temperatureGraphService = {
  inputs: {
    handleEditTemperatureNormative,
    setEditedTemperatureNormative,
    setUploadModalOpen,
    handleGetTemplateFile,
    handlePostTemplateFile,
    setFile,
    setEditDeviationModalOpen,
    toggleDeletingRows,
    handleDeleteRows,
    handleCreateRow,
    updateTemperatureNormativeFx,
  },
  outputs: {
    $temperatureNormative,
    $isEditing,
    $isLoading,
    $errorColumns,
    $isUploadModalOpen,
    $isFileLoading,
    $file,
    $temperatureLimits,
    $isDeviationEditModalOpen,
    $deletingRowIds,
  },
  gates: { TemperatureGraphGate },
};
