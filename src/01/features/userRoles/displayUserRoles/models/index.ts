import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { StringStringDictionaryItem } from 'myApi';

export const $userRoles = createStore<StringStringDictionaryItem[] | null>(null);
export const $isFetchingUserRolesFailed = createStore(false);

export const fetchUserRolesFx = createEffect<
  void,
  StringStringDictionaryItem[] | null
>();

export const UserRolesGate = createGate();
