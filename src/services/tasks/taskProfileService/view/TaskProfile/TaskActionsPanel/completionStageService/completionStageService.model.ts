import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

export const completionStageService = {
  outputs: {
    $taskConfirmationTypes: taskProfileService.outputs.$task.map(
      (task) => task?.allowableConfirmationTypes
    ),
    $taskType: taskProfileService.outputs.$task.map((task) => task?.type),
  },
};
