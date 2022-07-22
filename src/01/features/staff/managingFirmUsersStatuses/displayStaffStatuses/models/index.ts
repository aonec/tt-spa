import { EOrganizationUserWorkingStatusTypeStringDictionaryItem } from 'myApi';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $staffStatuses = createStore<
  EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null
>(null);
export const $isFetchingStaffStatusesFailed = createStore(false);

export const fetchStaffStatusesFx = createEffect<
  void,
  EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null
>();

export const StaffStatusesGate = createGate();
