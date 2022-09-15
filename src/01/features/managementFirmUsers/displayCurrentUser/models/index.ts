import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { OrganizationUserResponse } from 'myApi';

export const $currentManagingFirmUser = createStore<OrganizationUserResponse | null>(
  null
);

export const $userRoleTypes = $currentManagingFirmUser.map((user) =>
  user?.roles?.map((role) => role.key)
);

export const fetchCurrentManagingFirmUser = createEffect<
  void,
  OrganizationUserResponse
>();

export const CurrentManagingFirmUserGate = createGate();
