import { HousingStockAddressResponse } from 'myApi';

export type AddressTabProps = {
  address: HousingStockAddressResponse;
  existingCities: string[] | null;
  existingStreets: string[];
};
