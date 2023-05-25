import { createDomain, forward } from 'effector';
import { HousingStockListResponsePagedList } from 'myApi';
import { getHousingStocks } from './CreateDistrictBorderByMapService.api';
import { createGate } from 'effector-react';
import { GetHousingStocksRequestParams } from './CreateDistrictBorderByMapService.types';

const domain = createDomain('createDistrictBorderByMapService');

const HousingStocksListGate = createGate();

const fetchHousingStocksListFx = domain.createEffect<
  GetHousingStocksRequestParams,
  HousingStockListResponsePagedList
>(getHousingStocks);

const $housingStocks = domain
  .createStore<HousingStockListResponsePagedList | null>(null)
  .on(
    fetchHousingStocksListFx.doneData,
    (_, housingStocksPagedList) => housingStocksPagedList,
  );

forward({
  from: HousingStocksListGate.open,
  to: fetchHousingStocksListFx.prepend(() => ({})),
});

const $isLoadingHousingStocks = fetchHousingStocksListFx.pending;

export const CreateDistrictBorderByMapService = {
  inputs: {},
  outputs: {
    $housingStocks,
    $isLoadingHousingStocks,
  },
  gates: { HousingStocksListGate },
};
