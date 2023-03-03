import { createDomain, sample } from 'effector';
import { ETaskEngineeringElement, HousingStockWithTasksResponse } from 'myApi';
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

const resetFilters = domain.createEvent();

const handleClickMarker = domain.createEvent<HousingStockWithTasksResponse>();

const fetchHousingStocksWithTasksFx = domain.createEffect<
  GetHousingStocksWithTasksRequestPayload,
  HousingStockWithTasksResponse[]
>(getHousingStocksWithTasks);

const $housingStocksWithTasks = domain
  .createStore<HousingStockWithTasksResponse[]>([])
  .on(fetchHousingStocksWithTasksFx.doneData, (_, data) => data);

const $filtrationValues = domain
  .createStore<HousingStocksWithTasksFiltrationValues>({
    engineeringElement: ETaskEngineeringElement.IndividualDevice,
    resourceTypes: [],
    timeStatus: null,
    type: null,
    executorId: null,
  })
  .on(applyFilters, (prev, filters) => ({ ...prev, ...filters }))
  .reset(resetFilters);

const $selectedHousingStock = domain
  .createStore<HousingStockWithTasksResponse | null>(null)
  .on(handleClickMarker, (_, housingStock) => housingStock);

sample({
  clock: $filtrationValues,
  fn: getHousingStocksWithTasksRequestPayload,
  target: fetchHousingStocksWithTasksFx,
});

sample({
  source: $filtrationValues,
  clock: TaskTypesGate.open,
  fn: getHousingStocksWithTasksRequestPayload,
  target: fetchHousingStocksWithTasksFx,
});

const $isLoadingHousingStocksWithTasks = fetchHousingStocksWithTasksFx.pending;

export const tasksMapService = {
  inputs: {
    applyFilters,
    resetFilters,
    handleClickMarker,
  },
  outputs: {
    $taskTypes,
    $housingStocksWithTasks,
    $filtrationValues,
    $isLoadingHousingStocksWithTasks,
    $selectedHousingStock,
  },
  gates: {
    TaskTypesGate,
  },
};
