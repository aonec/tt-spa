import { sample } from 'effector';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { inspectorHousingStockService } from './inspectorHousingStockService.models';
import { UpdateHousingStockInspectorInfoRequestError } from './inspectorHousingStockService.types';

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
  (prev, newUpdate) => [...prev, { ...newUpdate, status: 'loading' }]
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx
    .failData,
  (prev, error: UpdateHousingStockInspectorInfoRequestError) => {
    const housingStockId = Number(error.config?.url?.split('/')[1]);
    return prev.map((elem) =>
      elem.housingStockId === housingStockId
        ? { ...elem, status: 'failed' }
        : elem
    );
  }
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx
    .doneData,
  (prev, data) => {
    return prev.filter((elem) => elem.housingStockId !== data?.id);
  }
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.reset(
  displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList
);

inspectorHousingStockService.outputs.$housingStocks.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx
    .doneData,
  (prev, hosuingStock) =>
    prev?.map((elem) =>
      elem.housingStockId === hosuingStock?.id
        ? {
            ...elem,
            inspectedDay: hosuingStock.inspectedDay,
            inspectorId: hosuingStock.inspectorId,
          }
        : elem
    )
);

sample({
  clock: inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
  target: inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx,
});
