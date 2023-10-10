import { StreetWithBuildingNumbersResponse } from 'api/types';
import { PreparedAddress } from './addTaskFromDispatcherService.types';

export const prepareAddressesForTreeSelect = (
  items: StreetWithBuildingNumbersResponse[] | null,
): PreparedAddress[] => {
  if (!items) return [];
  return items.reduce((acc, { street, addresses }) => {
    if (!street) return acc;

    const childrenAddresses = addresses || [];

    const children = childrenAddresses.map((address) => {
      const { corpus, buildingId, number } = address;

      const corpusText = corpus ? `, к. ${corpus}` : '';

      return {
        id: buildingId.toString(),
        address: `${street}, ${number}${corpusText}`,
      };
    });

    return [...acc, ...children];
  }, [] as PreparedAddress[]);
};
