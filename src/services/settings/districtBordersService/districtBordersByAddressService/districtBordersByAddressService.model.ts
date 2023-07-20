import { createDomain, sample } from 'effector';
import { getAddresses } from './districtBordersByAddressService.api';
import {
  StreetWithBuildingNumbersResponse,
  StreetWithBuildingNumbersResponsePagedList,
} from 'api/myApi';
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

const domain = createDomain('districtBordersByAddressService');

const DistrictBordersByAddressPageGate = createGate();

const pageResetter = domain.createEvent();

const handleOpenDistrictEditer = domain.createEvent();

// fix
const handleCloseDistrictEditer = domain.createEvent();

const setPoligon = domain.createEvent<{
  housingStockIds: number[];
  polygon: number[][];
}>();

const handleFetchAddress = domain.createEvent<FetchAddressQueryType>();

const setFilter = domain.createEvent<FilterType>();

const setHousingStockIdsWithStreet =
  domain.createEvent<CheckedHousingStocksIdWithStreetsHandler>();

const fetchAddressFx = domain.createEffect<
  FetchAddressQueryType,
  StreetWithBuildingNumbersResponsePagedList
>(getAddresses);

const $addresses = domain
  .createStore<StreetWithBuildingNumbersResponse[] | null>(null)
  .on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

const $filter = domain
  .createStore<FilterType | null>(null)
  .on(setFilter, (_, data) => data)
  .reset(pageResetter);

const $checkedhousingStockIdsWithStreet = domain
  .createStore<CheckedHousingStocksIdWithStreets[]>([])
  .on(setHousingStockIdsWithStreet, (prevIdsWithStreet, commingIdsWithStreet) =>
    addHousingStocksToChecked(prevIdsWithStreet, commingIdsWithStreet),
  )
  .reset(pageResetter);

const $checkedHousingStockIdsAndPoligon = domain
  .createStore<{
    housingStockIds: number[];
    polygon: number[][];
  }>({ housingStockIds: [], polygon: [] })
  .on(setPoligon, (_, data) => data)
  .reset(pageResetter);

const $onEditingInMap = domain
  .createStore<boolean>(false)
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
