import axios from 'axios';
import { HousingStockWithTasksResponse, TasksPagedList } from 'myApi';
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
