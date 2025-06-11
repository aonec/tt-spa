import { BuildingWithTasksResponse } from 'api/types';
import { countSimilarityPointsByAddress } from 'utils/countSimilarityPoints';
import { getBuildingItemAddressString } from 'utils/getBuildingAddress';

export const useAutocompleteOptions = (
  search: string | null,
  addresses: BuildingWithTasksResponse[],
  amount: number = 1,
) => {
  if (!search) return null;

  const sortedAddress = sortAddressBySimilarity(search, addresses);

  return {
    bestMatch: sortedAddress[0] || null,
    options: sortedAddress.slice(0, amount),
  };
};

export const sortAddressBySimilarity = (
  addressSearch: string,
  addresses: BuildingWithTasksResponse[],
) => {
  return addresses
    .map((item) => {
      const addressString = getBuildingItemAddressString(
        item.building?.address?.mainAddress,
      );
      const similarity = countSimilarityPointsByAddress(
        addressSearch,
        addressString,
      );
      return {
        ...item,
        similarity,
        label: addressString,
        value: item.building?.id || null,
      };
    })
    .filter((item) => item.similarity > 0) // Убираем нерелевантные результаты
    .sort((a, b) => b.similarity - a.similarity);
};
