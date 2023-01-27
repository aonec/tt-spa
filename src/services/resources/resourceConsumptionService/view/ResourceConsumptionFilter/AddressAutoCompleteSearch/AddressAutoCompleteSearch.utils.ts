import { AddressWithSearchString } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export const prepareOptionsForAutoComplete = (
  streets: AddressWithSearchString[],
  addressSearch: string,
) => {
  const similarOptions =
    streets.filter((elem) =>
      Boolean(countSimilarityPoints(addressSearch, elem.addressString)),
    ) || [];

  const sortedOptionsBySimilarity = similarOptions.sort((a, b) =>
    sortOptionsBySimilarity(a, b, addressSearch),
  );

  return sortedOptionsBySimilarity.map((street) => ({
    value: street.addressString,
  }));
};

const sortOptionsBySimilarity = (
  a: AddressWithSearchString,
  b: AddressWithSearchString,
  addressSearch: string,
) => {
  const aPoints = countSimilarityPoints(addressSearch, a.addressString);
  const bPoints = countSimilarityPoints(addressSearch, b.addressString);

  if (aPoints < bPoints) return 1;

  if (aPoints > bPoints) return -1;

  return 0;
};
