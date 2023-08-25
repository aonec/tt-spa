import { createDomain, sample } from 'effector';
import { getInspectorsHousingStocksQuery } from './displayInspectorsHousingStocksService.api';
import { GetInspectorsHousingStocksRequestParams } from './types';
import { searchInspectorsHousingStockService } from '../searchInspectorsHousingStocksService/searchInspectorsHousingStockService.models';
import { createGate } from 'effector-react';

const { startSearchInspectorsHousingStocks } =
  searchInspectorsHousingStockService.inputs;

const domain = createDomain('displayInspectorsHousingStocksService');

const DisplayInspectorsGate = createGate();

const $loading = getInspectorsHousingStocksQuery.$pending;

const handleGetInspectorsHousingStocks =
  domain.createEvent<GetInspectorsHousingStocksRequestParams>();

const $inspectorsHousingStocksList = getInspectorsHousingStocksQuery.$data;

sample({
  clock: startSearchInspectorsHousingStocks,
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
    $loading,
  },
  gates: { DisplayInspectorsGate },
};
