import { StreetWithHousingStockNumbersResponse } from 'myApi';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
} from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithHousingStockNumbersResponse;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdWithStreets[];
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
};
