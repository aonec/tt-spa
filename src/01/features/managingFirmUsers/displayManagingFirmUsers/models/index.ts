import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { ManagingFirmUserResponse } from './../../../../../myApi';

export const $managingFirmUsers = createStore<
  ManagingFirmUserResponse[] | null
>(null);

export const ManagingFirmUsersGate = createGate();

export const fetchManagingFirmUsersFx = createEffect();
