import { taskProfileService } from 'services/tasks/taskProfileService/taskProfileService.model';

const $individualDevices = taskProfileService.outputs.$task.map(
  (task) => task?.individualDevices || []
);

export const closeDeviceService = {
  outputs: {
    $individualDevices,
  },
};
