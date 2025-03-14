import { BuildingWithTasksResponse } from 'api/types';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';
import { getBuildingItemAddressString } from 'utils/getBuildingAddress';

export function useAutocomplete(
  search: string | null,
  addresses: BuildingWithTasksResponse[],
  amount: number = 1,
) {
  if (search === null) {
    return null;
  }

  const sortedAddress = sortAddressBySimilarity(search, addresses);

  return {
    bestMatch: sortedAddress[0],
    options: search ? sortedAddress.slice(0, amount) : [],
  };
}

export function sortAddressBySimilarity(
  addressSearch: string,
  addresses: BuildingWithTasksResponse[],
) {
  return addresses
    .sort((a, b) => {
      const aPoints = countSimilarityPoints(
        addressSearch,
        getBuildingItemAddressString(a.building?.address?.mainAddress),
      );
      const bPoints = countSimilarityPoints(
        addressSearch,
        getBuildingItemAddressString(b.building?.address?.mainAddress),
      );

      return bPoints - aPoints;
    })
    .map(({ building }) => ({
      label: getBuildingItemAddressString(building?.address?.mainAddress),
      building: building,
      value: building?.id || null,
    }));
}
