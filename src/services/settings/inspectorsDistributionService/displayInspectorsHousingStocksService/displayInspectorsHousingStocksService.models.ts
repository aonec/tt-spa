import { createDomain, sample } from 'effector';
import { InspectorOnBuildingResponse } from 'api/myApi';
import { getInspectorsHousingStocks } from './displayInspectorsHousingStocksService.api';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';

const { startSearchInspectorsHousingStocks } =
  searchInspectorsHousingStockService.inputs;

const domain = createDomain('displayInspectorsHousingStocksService');

const fetchInspectorsHousingStocksListFx = domain.createEffect<
  GetInspectorsHousingStocksRequestParams,
  InspectorOnBuildingResponse[] | null
>(getInspectorsHousingStocks);

const $loading = fetchInspectorsHousingStocksListFx.pending;

const handleGetInspectorsHousingStocks =
  domain.createEvent<GetInspectorsHousingStocksRequestParams>();

const $inspectorsHousingStocksList = domain
  .createStore<InspectorOnBuildingResponse[] | null>(null)
  .on(fetchInspectorsHousingStocksListFx.doneData, (_, list) => list);

sample({
  clock: startSearchInspectorsHousingStocks,
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
