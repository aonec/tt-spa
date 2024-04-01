import { createEffect, createEvent, createStore } from 'effector';
import { sample, split } from 'effector';
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
import { taskProfileService } from '../taskProfileService';
import _ from 'lodash';

const TasksIsOpen = createGate();
const InitialGate = createGate();

const clearAddress = createEvent();
const clearFilters = createEvent();
const setPipeNodeId = createEvent<{ pipeNodeId: string }>();
const setTasksPageSegment = createEvent<TasksPageSegment>();
const setDeviceId = createEvent<{ deviceId: string }>();
const extendedSearchOpened = createEvent();
const extendedSearchClosed = createEvent();
const changeFiltersByGroupType = createEvent<TaskGroupingFilter>();
const changeGroupType = createEvent<TaskGroupingFilter>();
const changePageNumber = createEvent<number>();
const searchTasks = createEvent<GetTasksListRequestPayload>();

const getApartmentFx = createEffect<FiltersGatePayload, ApartmentResponse>(
  fetchApartment,
);

const $apartment = createStore<ApartmentResponse | null>(null)
  .on(getApartmentFx.doneData, (_, apartment) => apartment)
  .reset(clearAddress);

const getHousingStockFx = createEffect<
  FiltersGatePayload,
  HousingStockResponse
>(fetchHousingStock);

const $housingStock = createStore<HousingStockResponse | null>(null)
  .on(getHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(clearAddress);

const $searchState = createStore<GetTasksListRequestPayload>({})
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
  .reset(clearFilters);

const startSearchTasks = createEvent();
const searchTasksFx = createEffect<
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
  source: {
    searchState: $searchState,
    isTaskProfileOpen: taskProfileService.outputs.$isTaskProfileOpen,
  },
  clock: searchTasksTrigger,
  filter: ({ isTaskProfileOpen, searchState }) =>
    !isTaskProfileOpen && Boolean(searchState.GroupType),

  fn: ({ isTaskProfileOpen, searchState }) => {
    const filteredData = _.omitBy(searchState, _.isNil);

    const filteredDataByNull = _.omitBy(
      filteredData,
      (value) => value === 'null',
    );

    return filteredDataByNull;
  },

  target: searchTasksFx,
});

sample({
  source: InitialGate.state,
  clock: $searchState,
  filter: (isOpen) => Boolean(isOpen),
  target: startSearchTasks,
});

const $tasksPagedData = createStore<TasksPagedList | null>(null).on(
  searchTasksFx.doneData,
  (_, tasksPaged) => tasksPaged,
);

const $isExtendedSearchOpen = createStore(false)
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

const $tasksPageSegment = createStore<TasksPageSegment>('list').on(
  setTasksPageSegment,
  (_, segment) => segment,
);

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
  },
};
