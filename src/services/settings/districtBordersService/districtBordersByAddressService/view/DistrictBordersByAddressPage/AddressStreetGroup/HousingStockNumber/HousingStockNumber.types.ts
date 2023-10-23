import { AddressShortResponse } from 'api/types';
import { CheckedHousingStocksIdWithStreetsHandler } from 'services/settings/districtBordersService/districtBordersByAddressService/districtBordersByAddressService.types';

export type HousingStockNumberProps = {
  housingStock: AddressShortResponse & { isDistributed: boolean };
  currentStreetCheckedHousingStockIds: number[];
  setHousingStockIdsWithStreet: (
    payload: CheckedHousingStocksIdWithStreetsHandler,
  ) => void;
  street: string | null;
};
