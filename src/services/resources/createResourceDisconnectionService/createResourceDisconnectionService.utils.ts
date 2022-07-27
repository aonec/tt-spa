import { StreetWithHousingStockNumbersResponse } from 'myApi';

export const prepareData = (items: StreetWithHousingStockNumbersResponse[]) =>
  items.map((street, indx) => ({
    title: street.street,
    key: `${street.street}`,
    children: street.housingStockNumbers?.map((housingStock) => ({
      title: `${street.street}, ${housingStock}`,
      value: `${street.street}, ${housingStock}`,
      key: `${street.street}, ${housingStock}`,
    })),
  }));
