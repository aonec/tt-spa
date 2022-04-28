import { forward, sample } from 'effector';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { displayInspectorsHousingStocksService } from './displayInspectorsHousingStocksService.models';
import { GetInspectorsHousingStocksRequestParams } from './types';

displayInspectorsHousingStocksService.outputs.$inspectorsHousingStocksList.on(
  displayInspectorsHousingStocksService.inputs
    .fetchInspectorsHousingStocksListFx.doneData,
  (_, list) => list
);

sample({
  source: searchInspectorsHousingStockService.forms.searchForm.$values,
  clock:
    displayInspectorsHousingStocksService.inputs
      .handleGetInspectorsHousingStocks,
  fn: (values) => values as GetInspectorsHousingStocksRequestParams,
  target:
    displayInspectorsHousingStocksService.inputs
      .fetchInspectorsHousingStocksListFx,
});

forward({
  from:
    displayInspectorsHousingStocksService.inputs.InspectorsHousingStockGate
      .state,
  to:
    displayInspectorsHousingStocksService.inputs
      .fetchInspectorsHousingStocksListFx,
});

sample({
  source: searchInspectorsHousingStockService.forms.searchForm.$values,
  clock:
    searchInspectorsHousingStockService.inputs
      .startSearchInspectorsHousingStocks,
  fn: (values) => values as GetInspectorsHousingStocksRequestParams,
  target:
    displayInspectorsHousingStocksService.inputs
      .fetchInspectorsHousingStocksListFx,
});
