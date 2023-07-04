import { StreetWithBuildingNumbersResponse } from 'myApi';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
} from '../../../districtBordersByAddressService.types';

export type AddressStreetGroupProps = {
  address: StreetWithBuildingNumbersResponse;
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdWithStreets[];
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
};
