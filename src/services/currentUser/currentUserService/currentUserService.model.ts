import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { sample } from 'effector';
import { OrganizationUserResponse } from 'api/types';
import { getCurrentUser } from './currentUserService.api';
import { currentUserEditServiceService } from '../currentUserEditService/currentUserEditServiceService.models';

const fetchCurrentUserFx = createEffect<void, OrganizationUserResponse>(
  getCurrentUser,
);
const $currentUser = createStore<OrganizationUserResponse | null>(null)
  .on(fetchCurrentUserFx.doneData, (_, user) => user)
  .on(currentUserEditServiceService.inputs.handleUpdateUser, (_, data) => data);

const $isLoading = fetchCurrentUserFx.pending;

const CurrentUserGate = createGate();

sample({ clock: CurrentUserGate.open, target: fetchCurrentUserFx });

const $currentUserRoles = $currentUser.map((user) => user?.roles || []);
const $userRolesKeys = $currentUserRoles.map((userRoles) =>
  userRoles.map((role) => role.key),
);

export const currentUserService = {
  outputs: {
    $currentUser,
    $isLoading,
    $currentUserRoles,
    $userRolesKeys,
    fetchCurrentUserFx,
  },
  gates: {
    CurrentUserGate,
  },
};
