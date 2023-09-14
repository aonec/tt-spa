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
