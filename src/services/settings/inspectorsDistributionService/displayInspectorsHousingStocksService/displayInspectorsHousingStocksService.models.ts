import { createEvent, createStore, sample } from 'effector';
import { getInspectorsHousingStocksQuery } from './displayInspectorsHousingStocksService.api';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStock.models';
import { createGate } from 'effector-react';

const { startSearchInspectorsHousingStocks } =
  searchInspectorsHousingStockService.inputs;

const DisplayInspectorsGate = createGate();

const $loading = getInspectorsHousingStocksQuery.$pending;

const handleGetInspectorsHousingStocks =
  createEvent<GetInspectorsHousingStocksRequestParams>();

const $inspectorsHousingStocksList = getInspectorsHousingStocksQuery.$data;

const $searchInspectorsFilter =
  createStore<GetInspectorsHousingStocksRequestParams>({}).on(
    startSearchInspectorsHousingStocks,
    (_, params) => params,
  );

sample({
  clock: $searchInspectorsFilter,
  target: getInspectorsHousingStocksQuery.start,
});

sample({
  clock: DisplayInspectorsGate.close,
  target: getInspectorsHousingStocksQuery.reset,
});

export const displayInspectorsHousingStocksService = {
  inputs: {
    handleGetInspectorsHousingStocks,
  },
  outputs: {
    $inspectorsHousingStocksList,
    $searchInspectorsFilter,
    $loading,
  },
  gates: { DisplayInspectorsGate },
};
