import { currentUserService } from 'services/currentUserService';

export const routerService = {
  outputs: {
    $currentUser: currentUserService.outputs.$currentUser,
  },
};
