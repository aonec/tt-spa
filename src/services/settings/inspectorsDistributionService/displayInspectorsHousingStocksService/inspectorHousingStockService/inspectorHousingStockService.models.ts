import { createDomain, sample } from 'effector';
import { message } from 'antd';
import { HousingStockResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { patchHousingStockInspectorInfo } from './inspectorHousingStockService.api';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from './inspectorHousingStockService.types';

const { $inspectorsList } = displayInspectorsService.outputs;

const { $inspectorsHousingStocksList } =
  displayInspectorsHousingStocksService.outputs;

const inspectorHousingStockServiceDomain = createDomain(
  'inspectorHousingStockService',
);

const $currentHousingStockUpdates =
  inspectorHousingStockServiceDomain.createStore<CurrentHousingStockUpdate[]>(
    [],
  );

const updateHousingStockInspectorInfoFx =
  inspectorHousingStockServiceDomain.createEffect<
    PatchHousingStockInspectorInfoPayload,
    HousingStockResponse | null,
    EffectFailDataAxiosError
  >(patchHousingStockInspectorInfo);

const updateHousingStockInspectorInfo =
  inspectorHousingStockServiceDomain.createEvent<PatchHousingStockInspectorInfoPayload>();

updateHousingStockInspectorInfoFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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

$inspectorsHousingStocksList.on(
  updateHousingStockInspectorInfoFx.done,
  (housingStocks, updatedHousingStock) => {
    const updatedHousingStocks = housingStocks?.map((housingStock) => {
      if (
        housingStock.buildingId !== updatedHousingStock.params.housingStockId
      ) {
        return housingStock;
      }

      const { inspectorId, inspectedDay } = updatedHousingStock.params.data;

      const res = {
        ...housingStock,
        inspectedDay: inspectedDay || housingStock.inspectedDay,
        inspectorId: inspectorId,
      };

      return res;
    });

    return updatedHousingStocks;
  },
);

sample({
  clock: updateHousingStockInspectorInfo,
  target: updateHousingStockInspectorInfoFx,
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
