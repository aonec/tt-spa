import { createDomain, forward } from 'effector';
import { HousingStockListResponsePagedList } from 'myApi';
import { getHousingStocks } from './CreateDistrictBorderByMapService.api';
import { createGate } from 'effector-react';
import { GetHousingStocksRequestParams } from './CreateDistrictBorderByMapService.types';

const domain = createDomain('createDistrictBorderByMapService');

const HousingStocksListGate = createGate();
const CreateDistrictBorderMapPageGate = createGate();

const handleCloseDistrictEditer = domain.createEvent();

const setSelectedHousingStocksIds = domain.createEvent<{
  housingStockIds: number[];
  polygon: number[][];
}>();

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

const $selectedHousingStockIdsAndPoligon = domain
  .createStore<{
    housingStockIds: number[];
    polygon: number[][];
  }>({ housingStockIds: [], polygon: [] })
  .on(setSelectedHousingStocksIds, (_, data) => data)
  .reset(CreateDistrictBorderMapPageGate.close);

forward({
  from: HousingStocksListGate.open,
  to: fetchHousingStocksListFx.prepend(() => ({})),
});

const $isLoadingHousingStocks = fetchHousingStocksListFx.pending;

export const CreateDistrictBorderByMapService = {
  inputs: {
    setSelectedHousingStocksIds,
    handleCloseDistrictEditer,
  },
  outputs: {
    $housingStocks,
    $isLoadingHousingStocks,
    $selectedHousingStockIdsAndPoligon,
  },
  gates: { HousingStocksListGate, CreateDistrictBorderMapPageGate },
};
