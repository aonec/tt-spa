import { currentUserService } from './../currentUserService/currentUserService.model';
import { rolesService } from 'services/employee/rolesService';

export const menuService = {
  outputs: {
    $userRoles: rolesService.outputs.$userRoles,
    $currentUser: currentUserService.outputs.$currentUser,
    $isCurrentUserLoading: currentUserService.outputs.$isLoading,
  },
  gates: {
    UserRolesGate: rolesService.gates.UserRolesGate,
  },
};
