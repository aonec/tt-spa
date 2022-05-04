import { createDomain } from 'effector';
import { InspectorOnHousingStockResponse } from 'myApi';
import { getInspectorsHousingStocks } from './displayInspectorsHousingStocksService.api';
import { GetInspectorsHousingStocksRequestParams } from './types';

const displayInspectorsHousingStocksServiceDomain = createDomain(
  'displayInspectorsHousingStocksService'
);

const $inspectorsHousingStocksList = displayInspectorsHousingStocksServiceDomain.createStore<
  InspectorOnHousingStockResponse[] | null
>(null);

const fetchInspectorsHousingStocksListFx = displayInspectorsHousingStocksServiceDomain.createEffect<
  GetInspectorsHousingStocksRequestParams,
  InspectorOnHousingStockResponse[] | null
>(getInspectorsHousingStocks);

const $loading = fetchInspectorsHousingStocksListFx.pending;

const handleGetInspectorsHousingStocks = displayInspectorsHousingStocksServiceDomain.createEvent<GetInspectorsHousingStocksRequestParams>();


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
