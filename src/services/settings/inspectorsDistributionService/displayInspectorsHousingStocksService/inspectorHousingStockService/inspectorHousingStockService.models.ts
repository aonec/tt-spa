import { displayInspectorsService } from 'services/inspectors/displayInspectorsService/displayInspectorsService.models';
import { createDomain, sample } from 'effector';
import { HousingStockResponse } from 'myApi';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { patchHousingStockInspectorInfo } from './inspectorHousingStockService.api';
import {
  CurrentHousingStockUpdate,
  PatchHousingStockInspectorInfoPayload,
} from './inspectorHousingStockService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

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
    return prev.filter((elem) => elem.housingStockId !== data?.id);
  },
);

$currentHousingStockUpdates.reset(
  displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList,
);

displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList.on(
  updateHousingStockInspectorInfoFx.doneData,
  (hosuingStocks, updatedHosuingStock) => {
    const updatedHousingStocks = hosuingStocks?.map((housingStock) => {
      if (housingStock.buildingId !== updatedHosuingStock?.id) {
        return housingStock;
      }

      return {
        ...housingStock,
        inspectedDay: updatedHosuingStock.inspectedDay,
        inspectorId: updatedHosuingStock.inspectorId,
      };
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
    $inspectors: displayInspectorsService.outputs.$inspectorsList,
    $housingStocks:
      displayInspectorsHousingStocksService.outputs
        .$inspectorsHousingStocksList,
    $currentHousingStockUpdates,
  },
};
