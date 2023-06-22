import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export function getPreparedStreetsOptions(
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
