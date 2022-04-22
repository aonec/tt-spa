import { sample } from 'effector';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { inspectorHousingStockService } from './inspectorHousingStockService.models';

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
  (prev, newUpdate) => [
    ...prev.filter(
      (elem) =>
        elem.housingStock.housingStockId !==
        newUpdate.housingStock.housingStockId
    ),
    { ...newUpdate, status: 'loading' },
  ]
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx
    .doneData,
  (prev, housingStock) => {
    return prev.map((elem) =>
      elem.housingStock.housingStockId === housingStock?.id
        ? { ...elem, status: 'done' }
        : elem
    );
  }
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx
    .failData,
  (prev, error: any) => {
    const housingStockId = Number(error.config?.url?.split('/')[1]);
    return prev.map((elem) =>
      elem.housingStock.housingStockId === housingStockId
        ? { ...elem, status: 'failed' }
        : elem
    );
  }
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.reset(
  displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList
);

sample({
  clock: inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
  fn: (data) => ({
    housingStockId: data.housingStock.housingStockId,
    data: data.updatedData,
  }),
  target: inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx,
});
