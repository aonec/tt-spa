import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { ManagingFirmUserListResponse } from 'myApi';

export const $staffList = createStore<ManagingFirmUserListResponse[] | null>(
  null
);

export const $isFetchingStaffFailed = createStore(false);

export const refetchStaff = createEvent();

export const fetchStaffFx = createEffect<
  void,
  ManagingFirmUserListResponse[] | null
>();

export const StaffGate = createGate();
