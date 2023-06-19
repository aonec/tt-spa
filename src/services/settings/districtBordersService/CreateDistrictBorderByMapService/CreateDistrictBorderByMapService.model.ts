import { createDomain, forward } from 'effector';
import {
  DistrictCreateRequest,
  DistrictResponse,
  HousingStockListResponsePagedList,
} from 'myApi-test';
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
    handleCreateDistrict,
    districtCreated,
  },
  outputs: {
    $housingStocks,
    $isLoadingHousingStocks,
    $isLoadingCreatingDistrict,
    $existingDistricts,
  },
  gates: { HousingStocksListGate },
};
