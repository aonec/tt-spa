import { createDomain } from 'effector';
import { tasksProfileService } from 'services/tasks/tasksProfileService';

const domain = createDomain('tasksCardService');

export const tasksCardService = {
  inputs: {},
  outputs: {
    $isAdministrator: tasksProfileService.outputs.$isAdministrator,
  },
};
