import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { UserRoleListResponse } from 'myApi';

export const $userRoles = createStore<UserRoleListResponse[] | null>(null);
export const $isFetchingUserRolesFailed = createStore(false);

export const fetchUserRolesFx = createEffect<
  void,
  UserRoleListResponse[] | null
>();

export const UserRolesGate = createGate();
