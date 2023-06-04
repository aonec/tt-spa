import { createDomain, forward } from 'effector';
import { getAddresses } from './districtBordersByAddressService.api';
import {
  StreetWithHousingStockNumbersResponse,
  StreetWithHousingStockNumbersResponsePagedList,
} from 'myApi';
import { FetchAddressQueryType } from './districtBordersByAddressService.types';

const domain = createDomain('districtBordersByAddressService');

const handleFetchAddress = domain.createEvent<FetchAddressQueryType>();

const fetchAddressFx = domain.createEffect<
  FetchAddressQueryType,
  StreetWithHousingStockNumbersResponsePagedList
>(getAddresses);

const $addresses = domain
  .createStore<StreetWithHousingStockNumbersResponse[] | null>(null)
  .on(fetchAddressFx.doneData, (_, addresses) => addresses.items);

forward({
  from: handleFetchAddress,
  to: fetchAddressFx,
});

export const districtBordersByAddressService = {
  inputs: { handleFetchAddress },
  outputs: { $addresses },
};
