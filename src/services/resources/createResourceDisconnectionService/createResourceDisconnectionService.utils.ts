import { StreetWithHousingStockNumbersResponse } from 'myApi';

export const prepareData = (items: StreetWithHousingStockNumbersResponse[]) =>
  items.map(({ street, addresses }) => ({
    title: street!,
    key: addresses?.reduce(
      (acc, elem) => elem.housingStockId.toString() + ' '+ acc,
      ''
    )!,
    value: addresses?.reduce(
      (acc, elem) => elem.housingStockId.toString() + ' ' + acc,
      ''
    )!,
    children: addresses?.map((address) => ({
      title: `${street}, ${address.housingStockNumber}`,
      value: address.housingStockId,
      key: address.housingStockId,
    })),
  }));
