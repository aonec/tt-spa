import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { ESecuredIdentityRoleNameStringDictionaryItem } from '../../../../../api/types';

export const $userRoles = createStore<ESecuredIdentityRoleNameStringDictionaryItem[] | null>(null);
export const $isFetchingUserRolesFailed = createStore(false);

export const fetchUserRolesFx = createEffect<
  void,
  ESecuredIdentityRoleNameStringDictionaryItem[] | null
>();

export const UserRolesGate = createGate();
