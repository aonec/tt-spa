import { createGate } from 'effector-react';
import { createDomain, sample } from 'effector';
import _ from 'lodash';
import { OrganizationUserResponse } from 'myApi';
import { getCurrentUser } from './currentUserService.api';
import { OrganizationCoordinates } from './currentUserService.types';

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

sample({ clock: CurrentUserGate.open, target: fetchCurrentUserFx });

const $currentUserRoles = $currentUser.map((user) => user?.roles || []);
const $userRolesKeys = $currentUserRoles.map((userRoles) =>
  userRoles.map((role) => role.key),
);

const $coordinates = $currentUser.map(
  (user): OrganizationCoordinates | null => {
    if (!user?.organization?.latitude || !user?.organization?.longitude) {
      return null;
    }

    return [user.organization.latitude, user.organization.longitude];
  },
);

export const currentUserService = {
  outputs: {
    $currentUser,
    $isLoading,
    $hasCorpuses,
    $diametersConfig,
    $currentUserRoles,
    $userRolesKeys,
    $organizationCoordinates: $coordinates,
  },
  gates: {
    CurrentUserGate,
  },
};
