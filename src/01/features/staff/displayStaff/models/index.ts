import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { OrganizationUserListResponse } from 'myApi';

export const $staffList = createStore<OrganizationUserListResponse[] | null>(
  null
);

export const $isFetchingStaffFailed = createStore(false);

export const refetchStaff = createEvent();

export const fetchStaffFx = createEffect<
  void,
  OrganizationUserListResponse[] | null
>();

export const StaffGate = createGate();
