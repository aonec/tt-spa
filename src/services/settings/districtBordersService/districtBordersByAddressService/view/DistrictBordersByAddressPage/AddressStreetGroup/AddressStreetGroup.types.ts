import { StreetWithHousingStockNumbersResponse } from 'myApi';
import { CheckedHousingStocksIdType } from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithHousingStockNumbersResponse;
  checkedhousingStockIds: CheckedHousingStocksIdType[];
  setHousingStockIds: (payload: CheckedHousingStocksIdType[]) => void;
};
