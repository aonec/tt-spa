import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  OrganizationUserListResponse,
  OrganizationUserListResponsePagedList,
} from 'api/types';
import {
  getHousingManagements,
  getPerpetratorIds,
  getTaskTypes,
} from './taskTypesService.api';

export const $taskTypes = createStore<
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(null);

export const $housingManagments = createStore<
  GuidStringDictionaryItem[] | null
>(null);

export const $organizationUsers = createStore<OrganizationUserListResponse[]>(
  [],
);

const fetchTaskTypesFx = createEffect<
  void,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null
>(getTaskTypes);

const fetchHousingManagments = createEffect<
  void,
  GuidStringDictionaryItem[] | null
>(getHousingManagements);

const fetchPerpetratorIds = createEffect<
  void,
  OrganizationUserListResponsePagedList
>(getPerpetratorIds);

export const TaskTypesGate = createGate();

forward({
  from: TaskTypesGate.open,
  to: [fetchTaskTypesFx, fetchHousingManagments, fetchPerpetratorIds],
});

$taskTypes.on(fetchTaskTypesFx.doneData, (_, types) => types);
$housingManagments.on(
  fetchHousingManagments.doneData,
  (_, managments) => managments,
);
$organizationUsers.on(
  fetchPerpetratorIds.doneData,
  (_, perpetrators) => perpetrators.items || [],
);
