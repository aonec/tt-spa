import { getCurrentUser } from './currentUserService.api';
import { createGate } from 'effector-react';
import { createDomain, forward } from 'effector';
import { OrganizationUserResponse } from 'myApi';

const domain = createDomain('currentUserService');

const $currentUser = domain.createStore<OrganizationUserResponse | null>(null);

const fetchCurrentUserFx = domain.createEffect<void, OrganizationUserResponse>(
  getCurrentUser
);

const $isLoading = fetchCurrentUserFx.pending;

const CurrentUserGate = createGate();

forward({ from: CurrentUserGate.open, to: fetchCurrentUserFx });

$currentUser.on(fetchCurrentUserFx.doneData, (_, user) => user);

const $currentUserRoles = $currentUser.map((user) => user?.roles || []);

export const currentUserService = {
  outputs: {
    $currentUser,
    $isLoading,
    $currentUserRoles,
  },
  gates: {
    CurrentUserGate,
  },
};
