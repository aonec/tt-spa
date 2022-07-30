import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { ManagingFirmUserResponse } from '../../../../../api/types';

export const $currentManagingFirmUser = createStore<ManagingFirmUserResponse | null>(
  null
);

export const $userRoleTypes = $currentManagingFirmUser.map((user) =>
  user?.roles?.map((role) => role.key)
);

export const fetchCurrentManagingFirmUser = createEffect<
  void,
  ManagingFirmUserResponse
>();

export const CurrentManagingFirmUserGate = createGate();
