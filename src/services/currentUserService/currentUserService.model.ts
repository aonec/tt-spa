import { getCurrentUser } from './currentUserService.api';
import { createGate } from 'effector-react';
import { createDomain, forward } from 'effector';
import { ManagingFirmUserResponse } from '../../api/types';

const domain = createDomain('currentUserService');

const $currentUser = domain.createStore<ManagingFirmUserResponse | null>(null);

const fetchCurrentUserFx = domain.createEffect<void, ManagingFirmUserResponse>(getCurrentUser);

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
