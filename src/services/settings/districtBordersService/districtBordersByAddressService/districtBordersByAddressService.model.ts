import { createDomain, forward, sample } from 'effector';
import { getAddresses } from './districtBordersByAddressService.api';
import {
  StreetWithHousingStockNumbersResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import {
  FetchAddressQueryType,
  FilterType,
} from './districtBordersByAddressService.types';

const domain = createDomain('districtBordersByAddressService');

const handleFetchAddress = domain.createEvent<FetchAddressQueryType>();

const setFilter = domain.createEvent<FilterType>();

const fetchAddressFx = domain.createEffect<
  FetchAddressQueryType,
  StreetWithHousingStockNumbersResponsePagedList
>(getAddresses);

const $addresses = domain
  .createStore<StreetWithHousingStockNumbersResponse[] | null>(null)
  .on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

const $filter = domain
  .createStore<FilterType | null>(null)
  .on(setFilter, (_, data) => data);

sample({
  clock: handleFetchAddress,
  target: fetchAddressFx,
});

export const districtBordersByAddressService = {
  inputs: { handleFetchAddress, setFilter },
  outputs: { $addresses, $filter },
};
