import { createMutation } from '@farfetched/core';
import { axios } from 'api/axios';
import { ReassignTasksRequest } from 'api/types';

export const reassignTasksMutation = createMutation<ReassignTasksRequest, void>(
  {
    handler: (data) => axios.post('/OrganizationUsers/ReassignTasks', data),
  },
);
