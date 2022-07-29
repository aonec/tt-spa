import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { EOrganizationUserWorkingStatusTypeStringDictionaryItem } from '../../../../../../api/types';

export const $staffStatuses = createStore<
  EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null
>(null);
export const $isFetchingStaffStatusesFailed = createStore(false);

export const fetchStaffStatusesFx = createEffect<
  void,
  EOrganizationUserWorkingStatusTypeStringDictionaryItem[] | null
>();

export const StaffStatusesGate = createGate();
