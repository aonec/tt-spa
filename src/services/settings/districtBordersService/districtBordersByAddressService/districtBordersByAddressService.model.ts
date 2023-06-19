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

const domain = createDomain('districtBordersByAddressService');

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

const $checkedhousingStockIds = $addresses
  .map<CheckedHousingStocksIdType[]>((address) => {
    if (!address) {
      return [];
    }
    return address.map((data) => ({
      street: data.street!,
      housingStocksId: [],
    }));
  })
  .on(setHousingStockIds, (_, ids) => ids);

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

export const districtBordersByAddressService = {
  inputs: { handleFetchAddress, setFilter, setHousingStockIds },
  outputs: {
    $addresses,
    $filter,
    $housingStocksWithCoordinates,
    $checkedhousingStockIds,
  },
};
