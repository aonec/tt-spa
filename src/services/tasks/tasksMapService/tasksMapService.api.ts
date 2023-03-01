import axios from 'axios';
import { HousingStockWithTasksResponse } from 'myApi';
import { GetHousingStocksWithTasksRequestPayload } from './tasksMapService.types';

export const getHousingStocksWithTasks = (
  params: GetHousingStocksWithTasksRequestPayload,
): Promise<HousingStockWithTasksResponse[]> =>
  axios.get('HousingStocks/HousingStockWithTasks', { params });
