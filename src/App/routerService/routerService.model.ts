import { currentUserService } from 'services/currentUserService';

export const routerService = {
  outputs: {
    $currentUserRoles: currentUserService.outputs.$currentUserRoles,
  },
};
