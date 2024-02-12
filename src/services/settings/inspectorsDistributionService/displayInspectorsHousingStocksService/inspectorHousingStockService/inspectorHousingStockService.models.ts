import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { message } from 'antd';
import { HousingStockResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { patchHousingStockInspectorInfo } from './inspectorHousingStockService.api';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from './inspectorHousingStockService.types';
import { getInspectorsHousingStocksQuery } from '../displayInspectorsHousingStocksService.api';
import { addInspectorService } from '../../addInspectorService';

const { $inspectorsList } = displayInspectorsService.outputs;

const { $inspectorsHousingStocksList, $searchInspectorsFilter } =
  displayInspectorsHousingStocksService.outputs;

const $currentHousingStockUpdates = createStore<CurrentHousingStockUpdate[]>(
  [],
);

const updateHousingStockInspectorInfoFx = createEffect<
  PatchHousingStockInspectorInfoPayload,
  HousingStockResponse | null,
  EffectFailDataAxiosError
>(patchHousingStockInspectorInfo);

const updateHousingStockInspectorInfo =
  createEvent<PatchHousingStockInspectorInfoPayload>();

updateHousingStockInspectorInfoFx.failData.watch(() => {
  message.error('Произошла ошибка смены инспектора');
});

$currentHousingStockUpdates.on(
  updateHousingStockInspectorInfo,
  (prev, newUpdate) => [...prev, { ...newUpdate, status: 'loading' }],
);

$currentHousingStockUpdates.on(
  updateHousingStockInspectorInfoFx.fail,
  (prev, { params }) => {
    const housingStockId = params.housingStockId;

    return prev.map((elem) => {
      if (elem.housingStockId !== housingStockId) return elem;

      return { ...elem, status: 'failed' };
    });
  },
);

$currentHousingStockUpdates.on(
  updateHousingStockInspectorInfoFx.doneData,
  (prev, data) => {
    if (!data?.id) return prev;

    return prev.filter((elem) => elem.housingStockId !== data.id);
  },
);

$currentHousingStockUpdates.reset($inspectorsHousingStocksList);

sample({
  source: $searchInspectorsFilter,
  clock: updateHousingStockInspectorInfoFx.done,
  target: getInspectorsHousingStocksQuery.start,
});

sample({
  clock: updateHousingStockInspectorInfo,
  target: updateHousingStockInspectorInfoFx,
});

sample({
  clock: addInspectorService.inputs.handleSuccessAddInspector,
  source: addInspectorService.outputs.$buildingId,
  fn: (buildingId, { id }) =>
    ({
      housingStockId: buildingId,
      data: { inspectorId: id },
    } as PatchHousingStockInspectorInfoPayload),
  target: updateHousingStockInspectorInfoFx,
});

sample({
  clock: addInspectorService.inputs.handleSuccessAddInspector,
  target: displayInspectorsService.inputs.fetchInspectorsListFx,
});

export const inspectorHousingStockService = {
  inputs: {
    updateHousingStockInspectorInfo,
    updateHousingStockInspectorInfoFx,
  },
  outputs: {
    $inspectors: $inspectorsList,
    $housingStocks: $inspectorsHousingStocksList,
    $currentHousingStockUpdates,
  },
};
