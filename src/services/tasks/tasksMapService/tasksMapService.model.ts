import { tasksProfileService } from '../tasksProfileService';

export const tasksMapService = {
  inputs: {},
  outputs: {
    $tasks: tasksProfileService.outputs.$tasksPagedData,
  },
};
