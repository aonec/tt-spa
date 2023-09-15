import _ from 'lodash';
import { ErpExecutorResponse } from 'api/types';
import { TaskReasonType } from './AddTaskForm.constants';
import { ExistingApartmentNumberType } from 'services/tasks/addTaskFromDispatcherService/addTaskFromDispatcherService.types';

type Address = {
  value: string;
};

export function autocompleteAddress(
  addressSearch: string,
  streets: string[],
): Address[] {
  if (!addressSearch) return [];
  const filteredStreets = streets.filter((street) =>
    street.toLocaleLowerCase().startsWith(addressSearch.toLocaleLowerCase()),
  );
  return filteredStreets.map((street) => ({ value: street }));
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

export function autocompleteTaskReason(
  search: string | null,
  taskReasons: TaskReasonType,
): TaskReasonType {
  if (!search) return taskReasons;

  return taskReasons.filter((taskReason) =>
    taskReason.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()),
  );
}
