import { createEffect, createStore } from 'effector';
import { forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { ESecuredIdentityRoleNameStringDictionaryItem } from 'api/types';
import { fetchUserRoles } from './rolesService.api';

const UserRolesGate = createGate();

const fetchUserRolesFx = createEffect<
  void,
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
>(fetchUserRoles);

const $userRoles = createStore<
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
>(null).on(fetchUserRolesFx.doneData, (_, userRoles) => userRoles);

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
