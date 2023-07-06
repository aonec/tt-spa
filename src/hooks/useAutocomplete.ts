import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export function useAutocomplete(street: string | undefined, streets: string[]) {
  if (street === undefined) {
    return null;
  }

  const sortedAddress = sortAddressBySimilarity(street, streets);

  return {
    bestMatch: sortedAddress[0]?.value || '',
    options: street ? [sortedAddress[0]] : [],
  };
}

function sortAddressBySimilarity(addressSearch: string, streets: string[]) {
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
