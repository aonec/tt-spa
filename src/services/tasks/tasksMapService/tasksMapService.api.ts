import axios from 'axios';
import { HousingStockWithTasksResponse } from 'myApi';
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
