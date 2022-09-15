import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { OrganizationUserResponse } from 'myApi';

export const $managingFirmUser = createStore<OrganizationUserResponse | null>(
  null
);
export const $isFetchingManagingFirmUserFailed = createStore(false);

export const fetchManagingFirmUserFx = createEffect<
  number,
  OrganizationUserResponse | null
>();

export const ManagingFirmUserGate = createGate<{ id: number }>();
