import { createMutation } from '@farfetched/core';
import { axios } from 'api/axios';
import { CloseTasksRequest, TaskCloseStatusModel } from 'api/types';

export const closeTasksMutation = createMutation<
  CloseTasksRequest,
  TaskCloseStatusModel[]
>({
  handler: (data): Promise<TaskCloseStatusModel[]> =>
    axios.post('Tasks/CloseAll', data),
});
