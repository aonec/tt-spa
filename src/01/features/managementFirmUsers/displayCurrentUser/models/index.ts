import { createGate } from 'effector-react';
import { createStore, createEffect } from 'effector';
import { ManagingFirmUserResponse } from 'myApi';

export const $currentManagingFirmUser = createStore<ManagingFirmUserResponse | null>(
  null
);

export const fetchCurrentManagingFirmUser = createEffect<
  void,
  ManagingFirmUserResponse
>();

export const CurrentManagingFirmUserGate = createGate();
