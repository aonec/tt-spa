import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const $taskConfirmationTypes = taskProfileService.outputs.$task.map(
  (task) => task?.allowableConfirmationTypes || null,
);

const $taskType = taskProfileService.outputs.$task.map(
  (task) => task?.type || null,
);

export const completionStageService = {
  outputs: {
    $taskConfirmationTypes,
    $taskType,
  },
};
