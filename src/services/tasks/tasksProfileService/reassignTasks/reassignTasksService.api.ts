import { createMutation, createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  OrganizationUserListResponsePagedList,
  ReassignTasksRequest,
} from 'api/types';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const reassignTasksMutation = createMutation({
  effect: createEffect<ReassignTasksRequest, void, EffectFailDataAxiosError>(
    (data) => axios.post('/OrganizationUsers/ReassignTasks', data),
  ),
});

export const organizationUsersQuery = createQuery<
  [],
  OrganizationUserListResponsePagedList
>({
  handler: () => axios.get('/OrganizationUsers'),
});
