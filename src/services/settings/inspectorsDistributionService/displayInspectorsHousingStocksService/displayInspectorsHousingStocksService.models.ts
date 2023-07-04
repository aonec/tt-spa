import { createDomain } from 'effector';
import { InspectorOnBuildingResponse } from 'myApi';
import { getInspectorsHousingStocks } from './displayInspectorsHousingStocksService.api';
import { GetInspectorsHousingStocksRequestParams } from './types';

const displayInspectorsHousingStocksServiceDomain = createDomain(
  'displayInspectorsHousingStocksService',
);

const $inspectorsHousingStocksList =
  displayInspectorsHousingStocksServiceDomain.createStore<
    InspectorOnBuildingResponse[] | null
  >(null);

const fetchInspectorsHousingStocksListFx =
  displayInspectorsHousingStocksServiceDomain.createEffect<
    GetInspectorsHousingStocksRequestParams,
    InspectorOnBuildingResponse[] | null
  >(getInspectorsHousingStocks);

const $loading = fetchInspectorsHousingStocksListFx.pending;

const handleGetInspectorsHousingStocks =
  displayInspectorsHousingStocksServiceDomain.createEvent<GetInspectorsHousingStocksRequestParams>();

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
