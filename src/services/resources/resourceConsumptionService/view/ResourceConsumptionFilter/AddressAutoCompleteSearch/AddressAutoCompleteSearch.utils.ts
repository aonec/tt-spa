import { AddressWithSearchString } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';

export const prepareOptionsForAutoComplete = (
  streets: AddressWithSearchString[],
  addressSearch: string
) => {
  if (!addressSearch) {
    return [];
  }
  const sortedOptions =
    streets
      ?.filter((elem) =>
        Boolean(countSimilarityPoints(addressSearch, elem.addressString))
      )
      ?.sort((a, b) => {
        const aPoints = countSimilarityPoints(addressSearch, a.addressString);
        const bPoints = countSimilarityPoints(addressSearch, b.addressString);

        if (aPoints < bPoints) return 1;

        if (aPoints > bPoints) return -1;

        return 0;
      })
      .slice(0, 5) || [];

  return sortedOptions.map((street) => ({
    value: street.addressString,
  }));
};
