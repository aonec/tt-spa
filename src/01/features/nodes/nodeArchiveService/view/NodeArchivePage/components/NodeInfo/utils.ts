import { HousingStockAddressResponse } from 'myApi';

export const getHousingStockAddressString = (
  address: HousingStockAddressResponse
) => {
  return `${address?.city}, ул. ${address?.street}, ${address?.housingStockNumber}${address?.corpus || ''}`;
};
