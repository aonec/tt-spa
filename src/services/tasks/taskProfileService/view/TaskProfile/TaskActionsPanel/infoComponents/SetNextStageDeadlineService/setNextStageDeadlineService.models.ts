import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const $deniedPermissionsCount = taskProfileService.outputs.$task.map(
  (task) => task?.apartment?.deniedPermissionsCount || 0,
);

export const setNextStageDeadlineService = {
  outputs: { $deniedPermissionsCount },
};
