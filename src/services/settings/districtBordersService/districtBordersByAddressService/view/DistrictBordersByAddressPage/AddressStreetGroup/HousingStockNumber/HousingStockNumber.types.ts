import { AddressShortResponse } from 'myApi';
import { CheckedHousingStocksIdType } from 'services/settings/districtBordersService/districtBordersByAddressService/districtBordersByAddressService.types';

export type HousingStockNumberProps = {
  housingStock: AddressShortResponse;
  currentStreetCheckedHousingStockIds: number[];
  checkedhousingStockIdsWithStreet: CheckedHousingStocksIdType[];
  setHousingStockIds: (payload: CheckedHousingStocksIdType[]) => void;
  street: string | null;
};
