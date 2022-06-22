import { axios } from '01/axios';
import { TasksPagedList } from 'myApi';

export const getTasks = (filter: any = {}): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { ...filter, pageSize: 30 } });
