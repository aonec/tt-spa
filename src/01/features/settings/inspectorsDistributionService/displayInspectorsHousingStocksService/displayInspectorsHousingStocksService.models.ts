import { createDomain } from 'effector';
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

export const displayInspectorsHousingStocksService = {
  inputs: {
    fetchInspectorsHousingStocksListFx,
  },
  outputs: {
    $inspectorsHousingStocksList,
  },
};
