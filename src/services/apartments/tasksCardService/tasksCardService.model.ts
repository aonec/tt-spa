import { createDomain } from 'effector';
import { tasksProfileService } from 'services/tasks/tasksProfileService';

const domain = createDomain('tasksCardService');

const $isAdministrator = tasksProfileService.outputs.$isAdministrator.map(
  (isAdministrator) => isAdministrator
);

export const tasksCardService = {
  outputs: {
    $isAdministrator,
  },
};
