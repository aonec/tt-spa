import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  StreetWithBuildingNumbersResponse,
} from 'myApi';
import { TreeSelectElement } from './AddressTreeSelect.types';

type PrepareAddressesParams = {
  items: StreetWithBuildingNumbersResponse[];
  parentId?: string;
  isSelectableStreetNode?: boolean;
};

export const prepareAddressesForTreeSelect = ({
  items,
  parentId,
  isSelectableStreetNode = true,
}: PrepareAddressesParams) =>
  items.reduce((acc, { street, addresses }) => {
    if (!street) return acc;

    const childrenAddresses = addresses || [];

    const children = childrenAddresses.map((address) => {
      const { housingStockCorpus, housingStockId, housingStockNumber } =
        address;

      const corpusText = housingStockCorpus ? `, к. ${housingStockCorpus}` : '';

      return {
        title: `${street}, ${housingStockNumber}${corpusText}`,
        value: housingStockId,
        key: housingStockId,
      };
    });

    const preparedParent = parentId ? parentId : '';

    return [
      ...acc,
      {
        title: street,
        key: `${street}${preparedParent}`,
        value: `${street}${preparedParent}`,
        children,
        selectable: isSelectableStreetNode,
      },
    ];
  }, [] as TreeSelectElement[]);

export const prepareAddressesWithParentsForTreeSelect = (
  items:
    | HeatingStationWithStreetsResponse[]
    | HouseManagementWithStreetsResponse[],
) =>
  items.reduce((acc, { id, name, streets }) => {
    if (!streets || !name) {
      return acc;
    }
    const children = prepareAddressesForTreeSelect({
      items: streets,
      parentId: id,
    });

    return [...acc, { title: name, value: id, key: id, children }];
  }, [] as TreeSelectElement[]);
