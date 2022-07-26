import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
} from '../../api/types';
import { getHousingManagements, getTaskTypes } from './taskTypesService.api';

export const $taskTypes = createStore<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(null);

export const $housingManagments = createStore<
  GuidStringDictionaryItem[] | null
>(null);

const fetchTaskTypesFx = createEffect<
  void,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(getTaskTypes);

const fetchHousingManagments = createEffect<
  void,
  GuidStringDictionaryItem[] | null
>(getHousingManagements);

export const TaskTypesGate = createGate();

forward({
  from: TaskTypesGate.open,
  to: [fetchTaskTypesFx, fetchHousingManagments],
});

$taskTypes.on(fetchTaskTypesFx.doneData, (_, types) => types);
$housingManagments.on(
  fetchHousingManagments.doneData,
  (_, managments) => managments
);
