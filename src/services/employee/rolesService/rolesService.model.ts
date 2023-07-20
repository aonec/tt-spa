import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { ESecuredIdentityRoleNameStringDictionaryItem } from 'api/myApi';
import { fetchUserRoles } from './rolesService.api';

const domain = createDomain('rolesService');

const UserRolesGate = createGate();

const fetchUserRolesFx = domain.createEffect<
  void,
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
>(fetchUserRoles);

const $userRoles = domain
  .createStore<ESecuredIdentityRoleNameStringDictionaryItem[] | null>(null)
  .on(fetchUserRolesFx.doneData, (_, userRoles) => userRoles);

forward({
  from: guard({
    clock: UserRolesGate.open,
    source: $userRoles,
    filter: (userRoles) => userRoles === null,
  }),
  to: fetchUserRolesFx,
});

export const rolesService = {
  outputs: { $userRoles },
  gates: { UserRolesGate },
};
