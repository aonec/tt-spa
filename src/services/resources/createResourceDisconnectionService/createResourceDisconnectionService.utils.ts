import { StreetWithHousingStockNumbersResponse } from 'myApi';
import { ExistingStreetWithHousingStocks } from './view/CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';

export const prepareAddressesForTreeSelect = (
  items: StreetWithHousingStockNumbersResponse[]
) =>
  items.reduce((acc, { street, addresses }) => {
    if (street) {
      const childrenAddresses = addresses || [];
      const children = childrenAddresses.map((address) => ({
        title: `${street}, ${address.housingStockNumber}`,
        value: address.housingStockId,
        key: address.housingStockId,
      }));

      return [
        ...acc,
        {
          title: street,
          key: street,
          value: street,
          children,
        },
      ];
    }
    return acc;
  }, [] as ExistingStreetWithHousingStocks[]);
