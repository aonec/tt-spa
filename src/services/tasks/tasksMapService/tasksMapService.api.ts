import axios from 'axios';
import {
  HousingStockWithTasksResponse,
  TaskResponse,
  TasksPagedList,
} from 'myApi';
import { GetHousingStocksWithTasksRequestPayload } from './tasksMapService.types';
import queryString from 'query-string';

export const getHousingStocksWithTasks = (
  params: GetHousingStocksWithTasksRequestPayload,
): Promise<HousingStockWithTasksResponse[]> => {
  return axios.get('HousingStocks/HousingStockWithTasks', {
    params,
    paramsSerializer: queryString.stringify,
  });
};

export const getTasksByHousingStock = (
  housingStockId: number,
): Promise<TasksPagedList> =>
  axios.get('Tasks', { params: { HousingStockId: housingStockId } });

export const getTask = (taskId: number): Promise<TaskResponse> =>
  axios.get(`Tasks/${taskId}`);
