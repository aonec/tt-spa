import { forward } from 'effector';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { displayInspectorsHousingStocksService } from './displayInspectorsHousingStocksService.models';

displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList.on(
  displayInspectorsHousingStocksService.inputs
    .fetchInspectorsHousingStocksListFx.doneData,
  (_, list) => list
);

forward({
  from:
    searchInspectorsHousingStockService.inputs
      .startSearchInspectorsHousingStocks,
  to:
    displayInspectorsHousingStocksService.inputs
      .fetchInspectorsHousingStocksListFx,
});
