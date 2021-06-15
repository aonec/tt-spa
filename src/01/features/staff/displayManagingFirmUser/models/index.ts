import { createGate } from 'effector-react';
import { createStore } from 'effector';
import { ManagingFirmUserResponse } from './../../../../../myApi';

export const $managingFirmUser = createStore<ManagingFirmUserResponse | null>(
  null
);

export const ManagingFirmUserGate = createGate();
