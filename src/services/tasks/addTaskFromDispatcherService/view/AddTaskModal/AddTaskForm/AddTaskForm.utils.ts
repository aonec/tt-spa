import _ from 'lodash';
import { ExecutorGrpcModel } from 'myApi';

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

export const sortByAlphabet = (leadExecutors: ExecutorGrpcModel[]) => {
  return _.sortBy(leadExecutors, [(o) => o.name]);
};
