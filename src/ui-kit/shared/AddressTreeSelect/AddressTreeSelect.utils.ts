import {
  HeatingStationWithStreetsResponse,
  HouseManagementWithStreetsResponse,
  StreetWithBuildingNumbersResponse,
} from 'api/types';
import { TreeSelectElement } from './AddressTreeSelect.types';

type PrepareAddressesParams = {
  items: StreetWithBuildingNumbersResponse[];
  parentId?: string;
  isSelectableStreetNode?: boolean;
  isTreeCheckable: boolean;
};

export const prepareAddressesForTreeSelect = ({
  items,
  parentId,
  isSelectableStreetNode = true,
  isTreeCheckable,
}: PrepareAddressesParams) =>
  items.reduce((acc, { street, addresses }) => {
    if (!street) return acc;

    const childrenAddresses = addresses || [];

    const children = childrenAddresses.map((address) => {
      const { corpus, buildingId, number } = address;

      const corpusText = corpus ? `, к. ${corpus}` : '';

      if (!isTreeCheckable) {
        return {
          title: `${street}, ${number}${corpusText}`,
          value: `${buildingId}_${street}${number}${corpusText}`,
          key: `${buildingId}_${street}${number}${corpusText}`,
          buildingId,
        };
      } else {
        return {
          title: `${street}, ${number}${corpusText}`,
          value: buildingId,
          key: buildingId,
        };
      }
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
      isTreeCheckable: true,
    });

    return [...acc, { title: name, value: id, key: id, children }];
  }, [] as TreeSelectElement[]);
