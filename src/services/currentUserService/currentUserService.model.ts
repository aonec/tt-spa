import { getCurrentUser } from './currentUserService.api';
import { createGate } from 'effector-react';
import { createDomain, forward } from 'effector';
import { ManagementFirmResponse } from 'myApi';

const domain = createDomain('currentUserService');

const $currentUser = domain.createStore<ManagementFirmResponse | null>(null);

const fetchCurrentUserFx = domain.createEffect<void, ManagementFirmResponse>(
  getCurrentUser
);

const $isLoading = fetchCurrentUserFx.pending;

const CurrentUserGate = createGate();

forward({ from: CurrentUserGate.open, to: fetchCurrentUserFx });

$currentUser.on(fetchCurrentUserFx.doneData, (_, user) => user);

export const currentUserService = {
  outputs: {
    $currentUser,
    $isLoading,
  },
  gates: {
    CurrentUserGate,
  },
};
