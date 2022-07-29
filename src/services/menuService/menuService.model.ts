import { currentUserService } from './../currentUserService/currentUserService.model';
import { $userRoles, UserRolesGate } from './../../01/features/userRoles/displayUserRoles/models/index';

export const menuService = {
  outputs: {
    $userRoles,
    $currentUser: currentUserService.outputs.$currentUser,
    $isCurrentUserLoading: currentUserService.outputs.$isLoading,
  },
  gates: {
    UserRolesGate,
    CurrentUserGate: currentUserService.gates.CurrentUserGate,
  },
};
