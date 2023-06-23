import { createDomain, sample } from 'effector';
import { getAddresses } from './districtBordersByAddressService.api';
import {
  StreetWithHousingStockNumbersResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
  FetchAddressQueryType,
  FilterType,
} from './districtBordersByAddressService.types';
import { CreateDistrictBorderByMapService } from '../CreateDistrictBorderByMapService';
import { createGate } from 'effector-react';
import { addHousingStocksToChecked } from './districtBordersByAddressService.utils';

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
const handleFetchHousingStocksList =
  CreateDistrictBorderByMapService.inputs.handleFetchHousingStocksList;

const setFilter = domain.createEvent<FilterType>();

const setHousingStockIdsWithStreet =
  domain.createEvent<CheckedHousingStocksIdWithStreetsHandler>();

const fetchAddressFx = domain.createEffect<
  FetchAddressQueryType,
  StreetWithHousingStockNumbersResponsePagedList
>(getAddresses);

const $addresses = domain
  .createStore<StreetWithHousingStockNumbersResponse[] | null>(null)
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
  clock: fetchAddressFx.doneData,
  source: $filter,
  fn: (data) => ({ City: data?.city }),
  target: handleFetchHousingStocksList,
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
  clock: handleOpenDistrictEditer,
  source: $checkedHousingStockIdsAndPoligon,
  target: handleCallEditByMap,
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
    $housingStocksWithCoordinates:
      CreateDistrictBorderByMapService.outputs.$housingStocks,
    $checkedhousingStockIdsWithStreet,
  },
  gates: { DistrictBordersByAddressPageGate },
};
