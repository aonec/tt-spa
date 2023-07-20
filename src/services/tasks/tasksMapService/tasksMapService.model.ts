import { createDomain, forward, sample } from 'effector';
import { BuildingWithTasksResponse, TaskResponse } from 'myApi';
import { tasksProfileService } from '../tasksProfileService';
import {
  $taskTypes,
  TaskTypesGate,
} from '../taskTypesService/taskTypesService.model';
import { getHousingStocksWithTasks, getTask } from './tasksMapService.api';
import {
  GetHousingStocksWithTasksRequestPayload,
  HousingStocksWithTasksFiltrationValues,
} from './tasksMapService.types';
import { getHousingStocksWithTasksRequestPayload } from './tasksMapService.utils';
import { currentUserService } from 'services/currentUserService';

const domain = createDomain('tasksMap');

const applyFilters =
  domain.createEvent<HousingStocksWithTasksFiltrationValues>();

const resetFilters = domain.createEvent();

const handleClickMarker = domain.createEvent<BuildingWithTasksResponse>();

const clearSelectedHousingStock = domain.createEvent();

const handleClickTask = domain.createEvent<number>();

const clearTask = domain.createEvent();

const fetchHousingStocksWithTasksFx = domain.createEffect<
  GetHousingStocksWithTasksRequestPayload,
  BuildingWithTasksResponse[]
>(getHousingStocksWithTasks);

const $housingStocksWithTasks = domain
  .createStore<BuildingWithTasksResponse[]>([])
  .on(fetchHousingStocksWithTasksFx.doneData, (_, data = []) => [...data]);

const fetchTaskFx = domain.createEffect<number, TaskResponse>(getTask);

const $filtrationValues = domain
  .createStore<HousingStocksWithTasksFiltrationValues>({
    engineeringElement: null,
    resourceTypes: [],
    timeStatus: null,
    type: null,
    executorId: null,
  })
  .on(applyFilters, (_, filters) => filters)
  .reset(resetFilters);

const $selectedHousingStock = domain
  .createStore<BuildingWithTasksResponse | null>(null)
  .on(handleClickMarker, (_, housingStock) => housingStock)
  .reset(clearSelectedHousingStock);

const $task = domain
  .createStore<TaskResponse | null>(null)
  .on(fetchTaskFx.doneData, (_, task) => task)
  .reset(clearTask, handleClickMarker);

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

forward({
  from: handleClickTask,
  to: fetchTaskFx,
});

const $isLoadingHousingStocksWithTasks = fetchHousingStocksWithTasksFx.pending;

const $isLoadingTask = fetchTaskFx.pending;

export const tasksMapService = {
  inputs: {
    applyFilters,
    resetFilters,
    handleClickMarker,
    clearSelectedHousingStock,
    handleClickTask,
    clearTask,
  },
  outputs: {
    $taskTypes,
    $housingStocksWithTasks,
    $filtrationValues,
    $isLoadingHousingStocksWithTasks,
    $selectedHousingStock,
    $task,
    $isLoadingTask,
    $organizationUsers: tasksProfileService.outputs.$organizationUsers,
    $organizationCoordinates:
      currentUserService.outputs.$organizationCoordinates,
  },
};
