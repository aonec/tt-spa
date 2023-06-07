import { createDomain, sample } from 'effector';
import {
  getAddresses,
  getHousingStocksWithCoordinates,
} from './districtBordersByAddressService.api';
import {
  HousingStockListResponsePagedList,
  StreetWithHousingStockNumbersResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  CheckedHousingStocksIdType,
  FetchAddressQueryType,
  FilterType,
  HousingStocksIdsWithCoordinates,
} from './districtBordersByAddressService.types';
import { CreateDistrictBorderByMapService } from '../CreateDistrictBorderByMapService';
import { createGate } from 'effector-react';

const domain = createDomain('districtBordersByAddressService');

const DistrictBordersByAddressPageGate = createGate();

const pageResetter = domain.createEvent();

const handleOpenDistrictEditer = domain.createEvent();
const handleCloseDistrictEditer =
  CreateDistrictBorderByMapService.inputs.handleCloseDistrictEditer;

const handleCallEditByMap =
  CreateDistrictBorderByMapService.inputs.setSelectedHousingStocksIds;

const setPoligon = domain.createEvent<{
  housingStockIds: number[];
  polygon: number[][];
}>();

const handleFetchAddress = domain.createEvent<FetchAddressQueryType>();

const setFilter = domain.createEvent<FilterType>();

const setHousingStockIds = domain.createEvent<CheckedHousingStocksIdType[]>();

const fetchAddressFx = domain.createEffect<
  FetchAddressQueryType,
  StreetWithHousingStockNumbersResponsePagedList
>(getAddresses);

const fetchHousingStocksWithCoordinatesFx = domain.createEffect<
  {
    City?: string;
  },
  HousingStockListResponsePagedList
>(getHousingStocksWithCoordinates);

const $addresses = domain
  .createStore<StreetWithHousingStockNumbersResponse[] | null>(null)
  .on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

const $filter = domain
  .createStore<FilterType | null>(null)
  .on(setFilter, (_, data) => data);

const $housingStocksWithCoordinates = domain
  .createStore<HousingStocksIdsWithCoordinates[]>([])
  .on(fetchHousingStocksWithCoordinatesFx.doneData, (_, housingStocks) =>
    housingStocks.items?.map((data) => ({
      id: data.id,
      coordinates: data.coordinates,
    })),
  );

const $streets = $addresses.map((address) => {
  if (!address) {
    return [];
  }
  return address.map((data) => ({
    street: data.street!,
    housingStocksId: [],
  }));
});

const addresses = $addresses.getState();
const streets = $streets.getState();

console.log(addresses);
console.log(streets);

const $checkedhousingStockIdsWithStreet = domain
  .createStore<CheckedHousingStocksIdType[]>(streets)
  .on(setHousingStockIds, (_, ids) => ids)
  .reset(pageResetter);

$checkedhousingStockIdsWithStreet.defaultState = $addresses
  .map((address) => {
    if (!address) {
      return [];
    }
    return address.map((data) => ({
      street: data.street!,
      housingStocksId: [],
    }));
  })
  .getState();

const $checkedHousingStockIdsAndPoligon = domain
  .createStore<{
    housingStockIds: number[];
    polygon: number[][];
  }>({ housingStockIds: [], polygon: [] })
  .on(setPoligon, (_, data) => data);

const $onEditingInMap = domain
  .createStore<boolean>(false)
  .on(handleOpenDistrictEditer, () => true)
  .on(handleCloseDistrictEditer, () => false);

sample({
  clock: DistrictBordersByAddressPageGate.close,
  source: $onEditingInMap,
  filter: (inMap) => {
    console.log(!inMap);
    return !inMap;
  },
  target: pageResetter,
});

sample({
  clock: $addresses,
  fn: (address) => {
    if (!address) {
      return [];
    }
    return address.map((data) => ({
      street: data.street!,
      housingStocksId: [],
    }));
  },
  target: $checkedhousingStockIdsWithStreet,
});

sample({
  clock: handleFetchAddress,
  target: fetchAddressFx,
});

sample({
  clock: fetchAddressFx.doneData,
  source: $filter,
  fn: (data) => ({ City: data?.city }),
  target: fetchHousingStocksWithCoordinatesFx,
});

sample({
  clock: handleOpenDistrictEditer,
  source: $checkedHousingStockIdsAndPoligon,
  target: handleCallEditByMap,
});

export const districtBordersByAddressService = {
  inputs: {
    handleFetchAddress,
    setFilter,
    setHousingStockIds,
    handleOpenDistrictEditer,
    setPoligon,
  },
  outputs: {
    $addresses,
    $filter,
    $housingStocksWithCoordinates,
    $checkedhousingStockIdsWithStreet,
    $streets,
  },
  gates: { DistrictBordersByAddressPageGate },
};
