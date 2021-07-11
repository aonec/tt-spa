import { EManagingFirmUserWorkingStatusTypeStringDictionaryItem } from '../../../../../../myApi';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $staffStatuses = createStore<
  EManagingFirmUserWorkingStatusTypeStringDictionaryItem[] | null
>(null);
export const $isFetchingStaffStatusesFailed = createStore(false);

export const fetchStaffStatusesFx = createEffect<
  void,
  EManagingFirmUserWorkingStatusTypeStringDictionaryItem[] | null
>();

export const StaffStatusesGate = createGate();
