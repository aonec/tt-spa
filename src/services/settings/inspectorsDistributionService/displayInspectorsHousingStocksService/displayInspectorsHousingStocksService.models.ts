import { createDomain, sample } from 'effector';
import { InspectorOnBuildingResponse } from 'myApi';
import { getInspectorsHousingStocks } from './displayInspectorsHousingStocksService.api';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';

const displayInspectorsHousingStocksServiceDomain = createDomain(
  'displayInspectorsHousingStocksService',
);

const fetchInspectorsHousingStocksListFx =
  displayInspectorsHousingStocksServiceDomain.createEffect<
    GetInspectorsHousingStocksRequestParams,
    InspectorOnBuildingResponse[] | null
  >(getInspectorsHousingStocks);

const $loading = fetchInspectorsHousingStocksListFx.pending;

const handleGetInspectorsHousingStocks =
  displayInspectorsHousingStocksServiceDomain.createEvent<GetInspectorsHousingStocksRequestParams>();

const $inspectorsHousingStocksList = displayInspectorsHousingStocksServiceDomain
  .createStore<InspectorOnBuildingResponse[] | null>(null)
  .on(fetchInspectorsHousingStocksListFx.doneData, (_, list) => list);

sample({
  clock:
    searchInspectorsHousingStockService.inputs
      .startSearchInspectorsHousingStocks,
  target: fetchInspectorsHousingStocksListFx,
});

export const displayInspectorsHousingStocksService = {
  inputs: {
    fetchInspectorsHousingStocksListFx,
    handleGetInspectorsHousingStocks,
  },
  outputs: {
    $inspectorsHousingStocksList,
    $loading,
  },
};
