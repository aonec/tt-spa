import { createDomain, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  HousingStockResponse,
  TaskGroupingFilter,
  TasksPagedList,
} from 'api/types';
import {
  $taskTypes,
  $housingManagments,
  $organizationUsers,
} from '../taskTypesService/taskTypesService.model';
import {
  fetchApartment,
  fetchHousingStock,
  getTasks,
} from './tasksProfileService.api';
import {
  FiltersGatePayload,
  GetTasksListRequestPayload,
} from './tasksProfileService.types';
import { TasksPageSegment } from './view/TasksProfile/TasksProfile.types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { addTaskFromDispatcherService } from '../addTaskFromDispatcherService';
import { getAcceptableSearchParams } from './tasksProfileService.utils';
import { interval } from 'patronum';

const domain = createDomain('tasksProfileService');

const TasksIsOpen = createGate();
const InitialGate = createGate();

const clearAddress = domain.createEvent();
const clearFilters = domain.createEvent();
const setPipeNodeId = domain.createEvent<{ pipeNodeId: string }>();
const setTasksPageSegment = domain.createEvent<TasksPageSegment>();
const setDeviceId = domain.createEvent<{ deviceId: string }>();
const extendedSearchOpened = domain.createEvent();
const extendedSearchClosed = domain.createEvent();
const changeFiltersByGroupType = domain.createEvent<TaskGroupingFilter>();
const changeGroupType = domain.createEvent<TaskGroupingFilter>();
const changePageNumber = domain.createEvent<number>();
const searchTasks = domain.createEvent<GetTasksListRequestPayload>();

const SetCityGate = createGate<{ cities: string[] | null }>();

const getApartmentFx = domain.createEffect<
  FiltersGatePayload,
  ApartmentResponse
>(fetchApartment);

const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(getApartmentFx.doneData, (_, apartment) => apartment)
  .reset(clearAddress);

const getHousingStockFx = domain.createEffect<
  FiltersGatePayload,
  HousingStockResponse
>(fetchHousingStock);

const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(getHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(clearAddress);

const $searchState = domain
  .createStore<GetTasksListRequestPayload>({})
  .on(setPipeNodeId, (prev, { pipeNodeId }) => ({
    ...prev,
    PipeNodeId: Number(pipeNodeId),
  }))
  .on(setDeviceId, (prev, { deviceId }) => ({
    ...prev,
    DeviceId: Number(deviceId),
  }))
  .on(searchTasks, (oldFilters, filters) => ({
    ...oldFilters,
    ...filters,
    PageNumber: 1,
  }))
  .on(changeFiltersByGroupType, ({ City }, GroupType) => ({
    GroupType,
    City,
    PageNumber: 1,
  }))
  .on(changeGroupType, (filters, GroupType) => ({
    ...filters,
    GroupType,
    PageNumber: 1,
  }))
  .on(changePageNumber, (filters, PageNumber) => ({ ...filters, PageNumber }))
  .on(SetCityGate.state, (prev, { cities }) => ({
    ...prev,
    City: cities?.length ? cities[cities.length - 1] : undefined,
  }))
  .reset(clearFilters);

const startSearchTasks = domain.createEvent();
const searchTasksFx = domain.createEffect<
  GetTasksListRequestPayload | null,
  TasksPagedList
>(getTasks);

const { tick: searchTasksTrigger } = interval({
  start: startSearchTasks,
  timeout: 40000,
  stop: $searchState.updates,
  leading: true,
});

sample({
  source: $searchState,
  clock: [searchTasksTrigger],
  filter: (searchState) => Boolean(searchState.City && searchState.GroupType),
  target: searchTasksFx,
});

sample({
  source: InitialGate.state,
  clock: $searchState,
  filter: (isOpen) => Boolean(isOpen),
  target: startSearchTasks,
});

const $tasksPagedData = domain
  .createStore<TasksPagedList | null>(null)
  .on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);

const $isExtendedSearchOpen = domain
  .createStore(false)
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

const $tasksPageSegment = domain
  .createStore<TasksPageSegment>('list')
  .on(setTasksPageSegment, (_, segment) => segment);

const $isLoading = searchTasksFx.pending;

sample({
  clock: TasksIsOpen.close,
  target: clearFilters,
});

split({
  source: sample({ clock: InitialGate.open, fn: getAcceptableSearchParams }),
  match: {
    housingStock: (searchParams) => Boolean(searchParams.housingStockId),
    apartmentId: (searchParams) => Boolean(searchParams.apartmentId),
    pipeNodeId: (searchParams) => Boolean(searchParams.pipeNodeId),
    deviceId: (searchParams) => Boolean(searchParams.deviceId),
  },
  cases: {
    housingStock: getHousingStockFx,
    apartmentId: getApartmentFx,
    pipeNodeId: setPipeNodeId,
    deviceId: setDeviceId,
  },
});

export const tasksProfileService = {
  inputs: {
    searchTasks,
    changeFiltersByGroupType,
    changeGroupType,
    changePageNumber,
    extendedSearchClosed,
    extendedSearchOpened,
    clearFilters,
    clearAddress,
    setTasksPageSegment,
    handleOpenAddTaskModal: addTaskFromDispatcherService.inputs.handleOpenModal,
  },
  outputs: {
    $taskTypes,
    $isLoading,
    $searchState,
    $tasksPagedData,
    $isExtendedSearchOpen,
    $housingManagments,
    $organizationUsers,
    $apartment,
    $housingStock,
    $tasksPageSegment,
    $existingCities: addressSearchService.outputs.$existingCities,
  },
  gates: {
    TasksIsOpen,
    InitialGate,
    SetCityGate,
  },
};
