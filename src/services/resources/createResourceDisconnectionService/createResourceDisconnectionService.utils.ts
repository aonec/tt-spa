import { StreetWithHousingStockNumbersResponse } from 'myApi';

export const prepareData = (items: StreetWithHousingStockNumbersResponse[]) =>
  items.map(({ street, addresses }) => ({
    title: street!,
    key: street!,
    children: addresses?.map((address) => ({
      title: `${street}, ${address.housingStockNumber}`,
      value: address.housingStockId,
      key: address.housingStockId,
    })),
  }));

