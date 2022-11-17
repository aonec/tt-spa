import { createGate } from 'effector-react';
import { createDomain, forward, sample } from 'effector';
import {
  HousingStockResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import { getAdresses } from 'services/objects/objectsProfileService/soiReportService/soiReportService.api';
import { GetAddressesRequestPayload } from 'services/objects/objectsProfileService/soiReportService/soiReportService.model.types';
import { getHousingStock } from './objectMapsService.api';

const domain = createDomain('objectMapsService');

const fetchHousingStock = domain.createEffect(getHousingStock);

const handleClickHousingStock = domain.createEvent<number>();

const clearHosuingStock = domain.createEvent();

const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(fetchHousingStock.doneData, (_, housingStock) => housingStock)
  .reset(clearHosuingStock);

const fetchAdressesFx = domain.createEffect<
  GetAddressesRequestPayload,
  StreetWithHousingStockNumbersResponsePagedList
>(getAdresses);

const $addressesPagedList = domain
  .createStore<StreetWithHousingStockNumbersResponsePagedList | null>(null)
  .on(fetchAdressesFx.doneData, (_, data) => data);

const StreetsWithHousingStocksGate = createGate();

sample({
  clock: StreetsWithHousingStocksGate.open,
  fn: () => ({}),
  target: fetchAdressesFx,
});

forward({
  from: handleClickHousingStock,
  to: fetchHousingStock,
});

const $isLoadingHousingStock = fetchHousingStock.pending;

export const objectMapsService = {
  inputs: { handleClickHousingStock, clearHosuingStock },
  outputs: {
    $addressesPagedList,
    $housingStock,
    $isLoadingHousingStock,
  },
  gates: { StreetsWithHousingStocksGate },
};
