import { getCurrentUser } from './currentUserService.api';
import { createGate } from 'effector-react';
import { createDomain, forward } from 'effector';
import { OrganizationUserResponse } from 'myApi';
import _ from 'lodash';

const domain = createDomain('currentUserService');

const fetchCurrentUserFx = domain.createEffect<void, OrganizationUserResponse>(
  getCurrentUser,
);
const $currentUser = domain
  .createStore<OrganizationUserResponse | null>(null)
  .on(fetchCurrentUserFx.doneData, (_, user) => user);

const $hasCorpuses = $currentUser.map(
  (user) =>
    user?.organization?.filtersConfiguration?.hasHousingStockCorpuses || false,
);

const $diametersConfig = $currentUser.map((user) => {
  const diameters = (
    user?.organization?.filtersConfiguration?.pipeDiameters || []
  ).sort((first, second) => first - second);

  const minValue = _.first(diameters) || 0;
  const maxValue = _.last(diameters) || 255;

  const marks = diameters.reduce((acc, value) => {
    if (value === minValue) {
      return { [value]: String(value), ...acc };
    }
    if (value === maxValue) {
      return { ...acc, [value]: String(value) };
    }
    return { ...acc, [value]: '' };
  }, {} as { [key: string]: string });

  return { marks, maxValue, minValue, diameters };
});

const $isLoading = fetchCurrentUserFx.pending;

const CurrentUserGate = createGate();

forward({ from: CurrentUserGate.open, to: fetchCurrentUserFx });

$currentUser.on(fetchCurrentUserFx.doneData, (_, user) => user);

const $currentUserRoles = $currentUser.map((user) => user?.roles || []);
const $userRolesKeys = $currentUserRoles.map((userRoles) =>
  userRoles.map((role) => role.key),
);

export const currentUserService = {
  outputs: {
    $currentUser,
    $isLoading,
    $hasCorpuses,
    $diametersConfig,
    $currentUserRoles,
    $userRolesKeys,
  },
  gates: {
    CurrentUserGate,
  },
};
