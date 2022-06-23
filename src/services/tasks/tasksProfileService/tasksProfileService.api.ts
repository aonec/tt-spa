import { axios } from '01/axios';
import { TasksPagedList } from 'myApi';
import { GetTasksListRequestPayload } from './tasksProfileService.types';

export const getTasks = (filter: GetTasksListRequestPayload): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { ...filter, pageSize: 30 } });
