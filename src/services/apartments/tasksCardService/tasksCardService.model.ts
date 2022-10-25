import { tasksProfileService } from 'services/tasks/tasksProfileService';

const $isAdministrator = tasksProfileService.outputs.$isAdministrator.map(
  (isAdministrator) => isAdministrator
);

export const tasksCardService = {
  outputs: {
    $isAdministrator,
  },
};
