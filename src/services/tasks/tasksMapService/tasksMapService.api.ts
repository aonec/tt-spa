import axios from 'axios';
import {
  BuildingWithTasksResponse,
  TaskResponse,
  TasksPagedList,
} from 'api/types';
import { GetHousingStocksWithTasksRequestPayload } from './tasksMapService.types';
import queryString from 'query-string';

export const getHousingStocksWithTasks = (
  params: GetHousingStocksWithTasksRequestPayload,
): Promise<BuildingWithTasksResponse[]> => {
  return axios.get('Buildings/BuildingsWithTasks', {
    params,
    paramsSerializer: (params) => queryString.stringify(params),
  });
};

export const getTasksByHousingStock = (
  housingStockId: number,
): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { HousingStockId: housingStockId } });

export const getTask = (taskId: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${taskId}`);
