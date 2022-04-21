import { forward } from 'effector';
import { sample } from 'lodash';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { displayInspectorsHousingStocksService } from './displayInspectorsHousingStocksService.models';

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
