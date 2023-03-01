import { createDomain, sample } from 'effector';
import { HousingStockWithTasksResponse } from 'myApi';
import {
  $taskTypes,
  TaskTypesGate,
} from '../taskTypesService/taskTypesService.model';
import { getHousingStocksWithTasks } from './tasksMapService.api';
import {
  GetHousingStocksWithTasksRequestPayload,
  HousingStocksWithTasksFiltrationValues,
} from './tasksMapService.types';
import { getHousingStocksWithTasksRequestPayload } from './tasksMapService.utils';

const domain = createDomain('tasksMap');

const applyFilters =
  domain.createEvent<Partial<HousingStocksWithTasksFiltrationValues>>();

const fetchHousingStocksWithTasksFx = domain.createEffect<
  GetHousingStocksWithTasksRequestPayload,
  HousingStockWithTasksResponse[]
>(getHousingStocksWithTasks);

const $housingStocksWithTasks = domain
  .createStore<HousingStockWithTasksResponse[]>([])
  .on(fetchHousingStocksWithTasksFx.doneData, (_, data) => data);

const $filtrationValues = domain
  .createStore<HousingStocksWithTasksFiltrationValues>({
    engineeringElement: null,
    resourceTypes: [],
    timeStatus: null,
    type: null,
    executorId: null,
  })
  .on(applyFilters, (prev, filters) => ({ ...prev, filters }));

sample({
  source: $filtrationValues,
  clock: TaskTypesGate.open,
  fn: getHousingStocksWithTasksRequestPayload,
  target: fetchHousingStocksWithTasksFx,
});

export const tasksMapService = {
  inputs: {
    applyFilters,
  },
  outputs: {
    $taskTypes,
    $housingStocksWithTasks,
    $filtrationValues,
  },
  gates: {
    TaskTypesGate,
  },
};
