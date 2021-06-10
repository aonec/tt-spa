import { EManagingFirmUserDismissialStatusTypeStringDictionaryItem } from './../../../../../myApi';
import { createStore } from 'effector';
import { createGate } from 'effector-react';

export const $staffStatuses = createStore<
  EManagingFirmUserDismissialStatusTypeStringDictionaryItem[] | null
>(null);

export const StaffStatusesGate = createGate();
