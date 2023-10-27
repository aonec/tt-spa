import { combine, createEffect, createEvent, createStore } from 'effector';
import _ from 'lodash';
import { sample } from 'effector';
import {
  getAddresses,
  getDistrictsWithHouses,
} from './districtBordersByAddressService.api';
import {
  DistrictResponse,
  House,
  StreetWithBuildingNumbersResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  CheckedHousingStocksWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FetchAddressQueryType,
  FilterType,
  StreetWithPreparedBuildingNumbers,
} from './districtBordersByAddressService.types';
import { createGate } from 'effector-react';
import {
  addHousingStocksToChecked,
  getHousesWithDisctictId,
} from './districtBordersByAddressService.utils';
import { createDistrictBorderMapService } from '../createDistrictBorderMapService/createDistrictBorderMapService.models';
import { existingHousingStocksQuery } from '../createDistrictBorderMapService/createDistrictBorderMapService.api';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { or } from 'patronum';

const DistrictBordersByAddressPageGate = createGate();

const pageResetter = createEvent();

const handleOpenDistrictEditer = createEvent();

// fix
const setPoligon = createEvent<{
  housingStockIds: number[];
  polygon: number[][];
}>();

const setFilter = createEvent<FilterType>();

const setHousingStockIdsWithStreet =
  createEvent<CheckedHousingStocksIdWithStreetsHandler>();

const selectCity = createEvent<string>();
const $selectedCity = createStore('').on(selectCity, (_, city) => city);

const getDistricts = createEvent();
const getDistrictsFx = createEffect<void, DistrictResponse[]>(
  getDistrictsWithHouses,
);
const $distrubitedAddresses = createStore<House[]>([])
  .on(getDistrictsFx.doneData, (_, districts) =>
    getHousesWithDisctictId(districts),
  )
  .reset(pageResetter);

const fetchAddressFx = createEffect<
  FetchAddressQueryType,
  StreetWithBuildingNumbersResponsePagedList
>(getAddresses);

const $addresses = createStore<StreetWithBuildingNumbersResponse[] | null>(
  null,
).on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

const $preparedAddresses = combine(
  $addresses,
  $distrubitedAddresses,
  (addresses, distributed) =>
    addresses
      ? addresses.reduce((acc, street) => {
          const houses = street.addresses
            ? street.addresses.map((address) => {
                const isDistributed = distributed.some(
                  (elem) => elem.id === address.buildingId,
                );

                return { ...address, isDistributed };
              })
            : null;

          return [...acc, { ...street, addresses: houses }];
        }, [] as StreetWithPreparedBuildingNumbers[])
      : null,
);

const $filter = createStore<FilterType | null>(null)
  .on(setFilter, (_, data) => data)
  .reset(pageResetter);

const $checkedhousingStockIdsWithStreet = createStore<
  CheckedHousingStocksWithStreets[]
>([])
  .on(setHousingStockIdsWithStreet, (prevIdsWithStreet, commingIdsWithStreet) =>
    addHousingStocksToChecked(prevIdsWithStreet, commingIdsWithStreet),
  )
  .reset(pageResetter);

const $checkedHousingStockIdsAndPoligon = createStore<{
  housingStockIds: number[];
  polygon: number[][];
}>({ housingStockIds: [], polygon: [] })
  .on(setPoligon, (_, data) => data)
  .reset(pageResetter);

const $isLoading = or(fetchAddressFx.pending, getDistrictsFx.pending);

sample({
  clock: addressSearchService.outputs.$existingCities,
  fn: (cities) => _.last(cities) || '',
  target: selectCity,
});

sample({
  clock: $selectedCity,
  filter: Boolean,
  fn: (City) => ({ City }),
  target: [fetchAddressFx, setFilter],
});

sample({
  clock: DistrictBordersByAddressPageGate.close,
  target: pageResetter,
});

sample({
  clock: DistrictBordersByAddressPageGate.open,
  target: [existingHousingStocksQuery.start, getDistricts],
});

sample({
  clock: getDistricts,
  target: getDistrictsFx,
});

sample({
  clock: handleOpenDistrictEditer,
  source: $checkedHousingStockIdsAndPoligon,
  target: createDistrictBorderMapService.inputs.setDistrictPayload,
});

export const districtBordersByAddressService = {
  inputs: {
    selectCity,
    setFilter,
    setHousingStockIdsWithStreet,
    handleOpenDistrictEditer,
    setPoligon,
  },
  outputs: {
    $addresses: $preparedAddresses,
    $filter,
    $checkedhousingStockIdsWithStreet,
    $isLoading,
  },
  gates: { DistrictBordersByAddressPageGate },
};
