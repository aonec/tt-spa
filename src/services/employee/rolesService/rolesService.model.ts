import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
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

sample({
  clock: sample({
    clock: UserRolesGate.open,
    source: $userRoles,
    filter: (userRoles) => userRoles === null,
  }),
  target: fetchUserRolesFx,
});

export const rolesService = {
  outputs: { $userRoles },
  gates: { UserRolesGate },
};
