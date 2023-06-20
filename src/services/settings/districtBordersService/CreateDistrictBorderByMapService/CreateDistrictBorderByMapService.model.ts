import { createDomain, sample, forward } from 'effector';
import {
  DistrictCreateRequest,
  DistrictResponse,
  HousingStockListResponsePagedList,
} from 'myApi';
import {
  createDistrict,
  getExistingDistricts,
  getHousingStocks,
} from './CreateDistrictBorderByMapService.api';
import { createGate } from 'effector-react';
import { GetHousingStocksRequestParams } from './CreateDistrictBorderByMapService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

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

const createDistrictFx = domain.createEffect<
  DistrictCreateRequest,
  void,
  EffectFailDataAxiosError
>(createDistrict);

const fetchExistingDistrictsFx = domain.createEffect<void, DistrictResponse[]>(
  getExistingDistricts,
);

const handleCreateDistrict = domain.createEvent<DistrictCreateRequest>();

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
const $existingDistricts = domain
  .createStore<DistrictResponse[]>([])
  .on(fetchExistingDistrictsFx.doneData, (_, districts) => {
    return districts;
  })
  .reset(HousingStocksListGate.close);

forward({
  from: HousingStocksListGate.open,
  to: [fetchHousingStocksListFx.prepend(() => ({})), fetchExistingDistrictsFx],
});

forward({
  from: handleCreateDistrict,
  to: createDistrictFx,
});

const $isLoadingHousingStocks = fetchHousingStocksListFx.pending;

const $isLoadingCreatingDistrict = createDistrictFx.pending;

const districtCreated = createDistrictFx.doneData;

districtCreated.watch(() => {
  message.success('Район успешно создан');
});

export const CreateDistrictBorderByMapService = {
  inputs: {
    setSelectedHousingStocksIds,
    handleCloseDistrictEditer,
    handleFetchHousingStocksList,
    handleCreateDistrict,
    districtCreated,
  },
  outputs: {
    $housingStocks,
    $isLoadingHousingStocks,
    $selectedHousingStockIdsAndPoligon,
    $isLoadingCreatingDistrict,
    $existingDistricts,
  },
  gates: { HousingStocksListGate, CreateDistrictBorderMapPageGate },
};
