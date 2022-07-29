import { axios } from '../../../api/axios';
import { TasksPagedList } from '../../../api/types';
import { GetTasksListRequestPayload } from './tasksProfileService.types';

export const getTasks = (
  filter: GetTasksListRequestPayload | null
): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { ...filter, pageSize: 20 } });
