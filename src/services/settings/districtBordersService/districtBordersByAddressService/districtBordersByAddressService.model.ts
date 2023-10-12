import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { getAddresses } from './districtBordersByAddressService.api';
import {
  StreetWithBuildingNumbersResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/types';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FetchAddressQueryType,
  FilterType,
} from './districtBordersByAddressService.types';
import { createGate } from 'effector-react';
import { addHousingStocksToChecked } from './districtBordersByAddressService.utils';
import { createDistrictBorderMapService } from '../createDistrictBorderMapService/createDistrictBorderMapService.models';
import { existingHousingStocksQuery } from '../createDistrictBorderMapService/createDistrictBorderMapService.api';

const DistrictBordersByAddressPageGate = createGate();

const pageResetter = createEvent();

const handleOpenDistrictEditer = createEvent();

// fix
const handleCloseDistrictEditer = createEvent();

const setPoligon = createEvent<{
  housingStockIds: number[];
  polygon: number[][];
}>();

const handleFetchAddress = createEvent<FetchAddressQueryType>();

const setFilter = createEvent<FilterType>();

const setHousingStockIdsWithStreet =
  createEvent<CheckedHousingStocksIdWithStreetsHandler>();

const fetchAddressFx = createEffect<
  FetchAddressQueryType,
  StreetWithBuildingNumbersResponsePagedList
>(getAddresses);

const $addresses = createStore<StreetWithBuildingNumbersResponse[] | null>(
  null,
).on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

const $filter = createStore<FilterType | null>(null)
  .on(setFilter, (_, data) => data)
  .reset(pageResetter);

const $checkedhousingStockIdsWithStreet = createStore<
  CheckedHousingStocksIdWithStreets[]
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

const $onEditingInMap = createStore<boolean>(false)
  .on(handleOpenDistrictEditer, () => true)
  .on(handleCloseDistrictEditer, () => false)
  .reset(pageResetter);

sample({
  clock: handleFetchAddress,
  target: fetchAddressFx,
});

sample({
  clock: DistrictBordersByAddressPageGate.close,
  source: $onEditingInMap,
  filter: (inMap) => {
    return !inMap;
  },
  target: pageResetter,
});

sample({
  clock: DistrictBordersByAddressPageGate.open,
  target: existingHousingStocksQuery.start,
});

sample({
  clock: handleOpenDistrictEditer,
  source: $checkedHousingStockIdsAndPoligon,
  target: createDistrictBorderMapService.inputs.setDistrictPayload,
});

export const districtBordersByAddressService = {
  inputs: {
    handleFetchAddress,
    setFilter,
    setHousingStockIdsWithStreet,
    handleOpenDistrictEditer,
    setPoligon,
  },
  outputs: {
    $addresses,
    $filter,
    $checkedhousingStockIdsWithStreet,
  },
  gates: { DistrictBordersByAddressPageGate },
};
