import { AddressWithSearchString } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export const prepareOptionsForAutoComplete = (
  streets: AddressWithSearchString[],
  addressSearch: string
) => {
  if (!addressSearch) {
    return [];
  }
  const similarOptions =
    streets?.filter((elem) =>
      Boolean(countSimilarityPoints(addressSearch, elem.addressString))
    ) || [];

  const sortOptionsBySimilarity = similarOptions?.sort((a, b) => {
    const aPoints = countSimilarityPoints(addressSearch, a.addressString);
    const bPoints = countSimilarityPoints(addressSearch, b.addressString);

    if (aPoints < bPoints) return 1;

    if (aPoints > bPoints) return -1;

    return 0;
  });

  const firstMostSimilarOptions = sortOptionsBySimilarity.slice(0, 5);

  return firstMostSimilarOptions.map((street) => ({
    value: street.addressString,
  }));
};
