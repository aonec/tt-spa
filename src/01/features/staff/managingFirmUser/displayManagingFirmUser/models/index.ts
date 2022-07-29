import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { ManagingFirmUserResponse } from '../../../../../../api/types';

export const $managingFirmUser = createStore<ManagingFirmUserResponse | null>(
  null
);
export const $isFetchingManagingFirmUserFailed = createStore(false);

export const fetchManagingFirmUserFx = createEffect<
  number,
  ManagingFirmUserResponse | null
>();

export const ManagingFirmUserGate = createGate<{ id: number }>();
