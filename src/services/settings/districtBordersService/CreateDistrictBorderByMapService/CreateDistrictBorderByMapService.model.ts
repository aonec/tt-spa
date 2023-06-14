import { createDomain,  sample } from 'effector';
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

const handleFetchHousingStocksList =
  domain.createEvent<GetHousingStocksRequestParams>();

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

sample({
  clock: [HousingStocksListGate.open, handleFetchHousingStocksList],
  source: $housingStocks,
  filter: (housingStocks) => !Boolean(housingStocks),
  target: fetchHousingStocksListFx.prepend(() => ({})),
});

const $isLoadingHousingStocks = fetchHousingStocksListFx.pending;

export const CreateDistrictBorderByMapService = {
  inputs: {
    setSelectedHousingStocksIds,
    handleCloseDistrictEditer,
    handleFetchHousingStocksList,
  },
  outputs: {
    $housingStocks,
    $isLoadingHousingStocks,
    $selectedHousingStockIdsAndPoligon,
  },
  gates: { HousingStocksListGate, CreateDistrictBorderMapPageGate },
};
