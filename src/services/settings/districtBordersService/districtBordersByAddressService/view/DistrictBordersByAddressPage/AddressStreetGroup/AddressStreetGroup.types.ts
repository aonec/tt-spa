import { StreetWithHousingStockNumbersResponse } from 'myApi';
import { CheckedHousingStocksIdType } from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithHousingStockNumbersResponse;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdType[];
  setHousingStockIds: (payload: CheckedHousingStocksIdType[]) => void;
};
