import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const { $task } = taskProfileService.outputs;

const $device = $task.map((task) => task?.device || null);

export const switchDeviceService = {
  outputs: {
    $device,
  },
};
