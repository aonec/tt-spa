import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { InspectorOnHousingStockResponse } from 'myApi';
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
>();

const $loading = fetchInspectorsHousingStocksListFx.pending;

const handleGetInspectorsHousingStocks = displayInspectorsHousingStocksServiceDomain.createEvent<GetInspectorsHousingStocksRequestParams>();

const InspectorsHousingStockGate = createGate<GetInspectorsHousingStocksRequestParams>();

export const displayInspectorsHousingStocksService = {
  inputs: {
    fetchInspectorsHousingStocksListFx,
    InspectorsHousingStockGate,
    handleGetInspectorsHousingStocks,
  },
  outputs: {
    $inspectorsHousingStocksList,
    $loading,
  },
};