import {
  HouseManagementWithStreetsResponse,
  StreetWithBuildingNumbersResponse,
} from 'api/types';
import { TreeSelectElement } from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.types';

export const getTreeDataOfManagementFirms = (
  managementFirms: HouseManagementWithStreetsResponse[] | null,
) => {
  if (!managementFirms) return [];

  return managementFirms
    .reduce((acc, elem) => {
      return [...acc, ...(elem.streets || [])];
    }, [] as StreetWithBuildingNumbersResponse[])
    .map((elem): TreeSelectElement => {
      return {
        title: elem.street!,
        key: elem.street!,
        value: elem.street!,
        children:
          elem.addresses?.map(
            (elem): TreeSelectElement => ({
              title: elem.number!,
              key: elem.number!,
              value: elem.buildingId,
              buildingId: elem.buildingId,
            }),
          ) || [],
      };
    });
};
