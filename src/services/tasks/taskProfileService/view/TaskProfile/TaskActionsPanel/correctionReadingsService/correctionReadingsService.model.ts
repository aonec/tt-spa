import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

export const correctionReadingsService = {
  outputs: {
    $task: taskProfileService.outputs.$task,
  },
};
