import { getCurrentUser } from './currentUserService.api';
import { createGate } from 'effector-react';
import { createDomain, forward } from 'effector';
import { OrganizationUserResponse } from 'myApi';

const domain = createDomain('currentUserService');

const fetchCurrentUserFx = domain.createEffect<void, OrganizationUserResponse>(
  getCurrentUser
);
const $currentUser = domain
  .createStore<OrganizationUserResponse | null>(null)
  .on(fetchCurrentUserFx.doneData, (_, user) => user);

const $hasCorpuses = $currentUser.map(
  (user) =>
    user?.organization?.filtersConfiguration?.hasHousingStockCorpuses || false
);

const $isLoading = fetchCurrentUserFx.pending;

const CurrentUserGate = createGate();

forward({ from: CurrentUserGate.open, to: fetchCurrentUserFx });

export const currentUserService = {
  outputs: {
    $currentUser,
    $isLoading,
    $hasCorpuses
  },
  gates: {
    CurrentUserGate,
  },
};
