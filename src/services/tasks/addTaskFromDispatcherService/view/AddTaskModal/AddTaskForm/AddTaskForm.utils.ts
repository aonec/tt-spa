import _ from 'lodash';
import { ErpExecutorResponse } from 'myApi';

type Address = {
  value: string;
};

export function autocompleteAddress(
  addressSearch: string,
  streets: string[],
): Address[] {
  const filteredStreets = streets.filter((street) =>
    street.toLocaleLowerCase().startsWith(addressSearch.toLocaleLowerCase()),
  );
  return filteredStreets.map((street) => ({ value: street }));
}

export const sortByAlphabet = (leadExecutors: ErpExecutorResponse[]) => {
  return _.sortBy(leadExecutors, [(o) => o.name]);
};
