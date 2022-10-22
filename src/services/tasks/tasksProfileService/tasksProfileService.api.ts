import { axios } from '01/axios';
import { ApartmentResponse, TasksPagedList } from 'myApi';
import {FiltersGatePayload, GetTasksListRequestPayload} from './tasksProfileService.types';

export const getTasks = (
  filter: GetTasksListRequestPayload | null
): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { ...filter, pageSize: 20 } });
