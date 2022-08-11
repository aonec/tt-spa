import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
} from 'myApi';
import {
  getHousingManagements,
  getPerpetratorIds,
  getTaskTypes,
} from './taskTypesService.api';
import {
  perpetratorItemsProps,
  perpetratorProps,
} from './taskTypesService.types';

export const $taskTypes = createStore<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(null);

export const $housingManagments = createStore<
  GuidStringDictionaryItem[] | null
>(null);

export const $perpetratorIdStore = createStore<perpetratorItemsProps[] | null>(
  null
);

const fetchTaskTypesFx = createEffect<
  void,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(getTaskTypes);

const fetchHousingManagments = createEffect<
  void,
  GuidStringDictionaryItem[] | null
>(getHousingManagements);

const fetchPerpetratorIds = createEffect<void, perpetratorItemsProps[] | null>(
  getPerpetratorIds
);

export const TaskTypesGate = createGate();

forward({
  from: TaskTypesGate.open,
  to: [fetchTaskTypesFx, fetchHousingManagments, fetchPerpetratorIds],
});

$taskTypes.on(fetchTaskTypesFx.doneData, (_, types) => types);
$housingManagments.on(
  fetchHousingManagments.doneData,
  (_, managments) => managments
);
$perpetratorIdStore.on(
  fetchPerpetratorIds.doneData,
  (_, perpetrators) => perpetrators
);
