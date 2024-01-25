import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export function useAutocomplete(
  street: string | null,
  streets: string[],
  amount: number = 1,
) {
  if (street === null) {
    return null;
  }

  const sortedAddress = sortAddressBySimilarity(street, streets);

  return {
    bestMatch: sortedAddress[0]?.value || '',
    options: street ? sortedAddress.slice(0, amount) : [],
  };
}

export function sortAddressBySimilarity(
  addressSearch: string,
  streets: string[],
) {
  return streets
    .sort((a, b) => {
      const aPoints = countSimilarityPoints(addressSearch, a);
      const bPoints = countSimilarityPoints(addressSearch, b);

      return bPoints - aPoints;
    })
    .map((street) => ({
      value: street,
    }));
}
