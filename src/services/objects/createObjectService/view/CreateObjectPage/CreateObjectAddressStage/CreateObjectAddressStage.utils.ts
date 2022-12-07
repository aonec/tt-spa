import { countSimilarityPoints } from 'services/objects/createObjectService/createObjectService.utils';

export function getPreparedStreetsOptions(
  addressSearch: string,
  streets: string[]
) {
  return streets
    .sort((a, b) => {
      const aPoints = countSimilarityPoints(addressSearch, a);
      const bPoints = countSimilarityPoints(addressSearch, b);

      if (aPoints < bPoints) return 1;

      if (aPoints > bPoints) return -1;

      return 0;
    })
    .map((street) => ({
      value: street,
    }));
}
