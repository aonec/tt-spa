import { $task } from "../../../../features/tasks/displayTask/models";

const $deniedPermissionsCount = $task.map(
  (task) => task?.apartment?.deniedPermissionsCount || 0
);

export const setNextStageDeadlineService = {
  outputs: { $deniedPermissionsCount },
};