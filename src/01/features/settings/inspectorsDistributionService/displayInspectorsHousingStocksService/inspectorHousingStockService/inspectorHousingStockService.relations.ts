import { sample } from 'effector';
import { displayInspectorsHousingStocksService } from '../displayInspectorsHousingStocksService.models';
import { inspectorHousingStockService } from './inspectorHousingStockService.models';

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
  (prev, newUpdate) => [...prev, { ...newUpdate, status: 'loading' }]
);

inspectorHousingStockService.outputs.$currentHousingStockUpdates.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx.fail,
  (prev, { params }) => {
    const housingStockId = params.housingStockId;

    return prev.map((elem) => {
      if (elem.housingStockId !== housingStockId) return elem;

      return { ...elem, status: 'failed' };
    });
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

displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList.on(
  inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx
    .doneData,
  (hosuingStocks, updatedHosuingStock) => {
    const updatedHousingStocks = hosuingStocks?.map((housingStock) => {
      if (housingStock.housingStockId !== updatedHosuingStock?.id) {
        return housingStock;
      }

      return {
        ...housingStock,
        inspectedDay: updatedHosuingStock.inspectedDay,
        inspectorId: updatedHosuingStock.inspectorId,
      };
    });

    return updatedHousingStocks;
  }
);

sample({
  clock: inspectorHousingStockService.inputs.updateHousingStockInspectorInfo,
  target: inspectorHousingStockService.inputs.updateHousingStockInspectorInfoFx,
});
