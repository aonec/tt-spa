import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { TasksPagedList } from 'api/types';
import { GetTasksListRequestPayload } from 'services/tasks/tasksProfileService/tasksProfileService.types';

export const tasksCountQuery = createQuery({
  handler: (
    filter: GetTasksListRequestPayload | null,
  ): Promise<TasksPagedList> =>
    axios.get('Tasks', { params: { ...filter, pageSize: 0 } }),
});
