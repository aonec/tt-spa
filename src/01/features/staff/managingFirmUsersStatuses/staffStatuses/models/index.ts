import { EManagingFirmUserDismissialStatusTypeStringDictionaryItem } from '../../../../../../myApi';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $staffStatuses = createStore<
  EManagingFirmUserDismissialStatusTypeStringDictionaryItem[] | null
>(null);
export const $isFetchingStaffStatusesFailed = createStore(false);

export const fetchStaffStatusesFx = createEffect<
  void,
  EManagingFirmUserDismissialStatusTypeStringDictionaryItem[] | null
>();

export const StaffStatusesGate = createGate();
