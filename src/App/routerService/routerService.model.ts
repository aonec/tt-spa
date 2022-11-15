import { createDomain } from 'effector';
import { $currentManagingFirmUser } from '01/features/managementFirmUsers/displayCurrentUser/models';

const domain = createDomain('routerService');

export const routerService = {
  outputs: {
    $currentManagingFirmUser,
  },
};
