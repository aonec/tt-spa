import _ from 'lodash';
import { ErpExecutorResponse } from 'api/types';
import { TaskReasonType } from './AddTaskForm.constants';
import { countSimilarityPoints } from 'utils/countSimilarityPoints';

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

export function autocompleteTaskReason(
  search: string | null,
  taskReasons: TaskReasonType,
): TaskReasonType {
  if (!search) return taskReasons;

  // return taskReasons.sort((a, b) => {
  //   const aPoints = countSimilarityPoints(search, a.name);
  //   const bPoints = countSimilarityPoints(search, b.name);

  //   return bPoints - aPoints;
  // });

  return taskReasons.filter((taskReason) =>
    taskReason.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()),
  );
}

type FullnameType = [secondName: string, firstName: string, surName: string];

export function sortSubscriberName(
  fullNames: FullnameType[],
  search: string,
): FullnameType[] {
  return fullNames
    .filter((name) => name.some((part) => part.includes(search)))
    .sort((a, b) => {
      const aWeight =
        (a[0].includes(search) ? 2 : 0) +
        (a[1].includes(search) ? 1 : 0) +
        (a[2].includes(search) ? 1 : 0);
      const bWeight =
        (b[0].includes(search) ? 2 : 0) +
        (b[1].includes(search) ? 1 : 0) +
        (b[2].includes(search) ? 1 : 0);
      return bWeight - aWeight;
    });
}
