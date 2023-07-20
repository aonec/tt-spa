import { AddressShortResponse } from 'api/types';
import {
  CheckedHousingStocksIdWithStreets,
  CheckedHousingStocksIdWithStreetsHandler,
} from 'services/settings/districtBordersService/districtBordersByAddressService/districtBordersByAddressService.types';

export type HousingStockNumberProps = {
  housingStock: AddressShortResponse;
  currentStreetCheckedHousingStockIds: number[];
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdWithStreets[];
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
  street: string | null;
};
