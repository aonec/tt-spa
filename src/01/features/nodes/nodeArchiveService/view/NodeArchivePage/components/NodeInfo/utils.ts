import { HousingStockShortResponse } from 'myApi';

export const getHousingStockAddressString = (
  address: HousingStockShortResponse
) => {
  return `${address?.city}, ул. ${address?.street}${address?.corpus || ''}`;
};
