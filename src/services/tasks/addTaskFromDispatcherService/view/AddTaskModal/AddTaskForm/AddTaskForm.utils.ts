import _ from 'lodash';
import { ErpExecutorResponse } from 'api/types';
import {
  ExistingApartmentNumberType,
  PreparedAddress,
} from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';
import { AddressOption } from './AddTaskForm.types';

export function preparedAddressOption(
  addressSearch: string,
  streets: PreparedAddress[],
): AddressOption[] {
  if (!addressSearch) return [];

  const filteredStreets = streets.filter((street) =>
    street.address
      .toLocaleLowerCase()
      .startsWith(addressSearch.toLocaleLowerCase()),
  );

  return filteredStreets.map((street) => ({
    value: street.address,
    key: street.id,
  }));
}

export function autocompleteApartNumber(
  apartmentNumber: string | null,
  existingApartmentNumbers: ExistingApartmentNumberType[],
): ExistingApartmentNumberType[] {
  if (!apartmentNumber) return existingApartmentNumbers;
  return existingApartmentNumbers.filter((apart) =>
    apart.value
      .toLocaleLowerCase()
      .startsWith(apartmentNumber.toLocaleLowerCase()),
  );
}

export const sortByAlphabet = (leadExecutors: ErpExecutorResponse[]) => {
  return _.sortBy(leadExecutors, [(o) => o.name]);
};
