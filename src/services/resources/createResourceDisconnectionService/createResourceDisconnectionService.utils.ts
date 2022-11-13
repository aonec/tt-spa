import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  StreetWithHousingStockNumbersResponse,
} from 'myApi';
import { TreeSelectElement } from './view/CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';

export const prepareAddressesForTreeSelect = (
  items: StreetWithHousingStockNumbersResponse[],
  parentId?: string,
  isSelectableStreetNode: boolean = true
) =>
  items.reduce((acc, { street, addresses }) => {
    if (!street) return acc;

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
        key: `${street}${parentId}`,
        value: `${street}${parentId}`,
        children,
        selectable: isSelectableStreetNode,
      },
    ];
  }, [] as TreeSelectElement[]);

export const prepareAddressesWithParentsForTreeSelect = (
  items:
    | HeatingStationWithStreetsResponse[]
    | HouseManagementWithStreetsResponse[]
) =>
  items.reduce((acc, { id, name, streets }) => {
    if (!streets || !name) {
      return acc;
    }
    const children = prepareAddressesForTreeSelect(streets, id);

    return [...acc, { title: name, value: id, key: id, children }];
  }, [] as TreeSelectElement[]);
