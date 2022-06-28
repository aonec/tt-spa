import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { EManagingFirmTaskFilterTypeNullableStringDictionaryItem } from 'myApi';
import { getTaskTypes } from './taskTypesService.api';

export const $taskTypes = createStore<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(null);

const fetchTaskTypesFx = createEffect<
  void,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(getTaskTypes);

export const TaskTypesGate = createGate();

forward({
  from: TaskTypesGate.open,
  to: fetchTaskTypesFx,
});

$taskTypes.on(fetchTaskTypesFx.doneData, (_, types) => types);
