import { createEffect, createEvent, createStore } from 'effector';
import { sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  EManagingFirmTaskFilterType,
  EOrderByRule,
  EResourceType,
  HousingStockResponse,
  TaskGroupingFilter,
  TaskPaginationOrderRule,
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
import { applicationInfoService } from '../taskProfileService/applicationInfoService';

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
const setAddress = createEvent<{
  city: string;
  street: string;
  resource?: EResourceType;
  taskType?: EManagingFirmTaskFilterType;
}>();
const toggleTaskCheckbox = createEvent<number>();
const setSelectedTasks = createEvent<number[]>();
const refetchTasks = createEvent();

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

const $searchState = createStore<GetTasksListRequestPayload>({
  OrderRule: TaskPaginationOrderRule.CreationTime,
  OrderBy: EOrderByRule.Ascending,
})
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
  .on(setAddress, (filters, paylaod) => ({
    ...filters,
    City: paylaod.city,
    Street: paylaod.street,
    TaskType: paylaod.taskType,
    Resource: paylaod.resource,
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

const $selectedTasks = createStore<number[]>([])
  .on(toggleTaskCheckbox, (prev, id) => {
    if (prev.includes(id)) {
      return prev.filter((item) => item !== id);
    }

    return [...prev, id];
  })
  .on(setSelectedTasks, (_, arr) => arr)
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
    selectedTasks: $selectedTasks,
  },
  clock: searchTasksTrigger,
  filter: ({ isTaskProfileOpen, searchState, selectedTasks }) =>
    !isTaskProfileOpen &&
    Boolean(searchState.GroupType) &&
    !selectedTasks.length,
  fn: ({ searchState }) => {
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
  clock: applicationInfoService.inputs.handleSuccessDelete,
  source: $searchState,
  fn: (searchState) => {
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

sample({
  clock: refetchTasks,
  source: $searchState,
  target: searchTasksFx,
});

const $tasksPagedData = createStore<TasksPagedList | null>(null).on(
  searchTasksFx.doneData,
  (_, tasksPaged) => tasksPaged,
);

const $tasksSummaryData = $tasksPagedData.map((data) => ({
  runningOutTasksCount: data?.runningOutTasksCount || null,
  expiredTasksCount: data?.expiredTasksCount || null,
  executingTasksCount: data?.executingTasksCount || null,
}));

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
    address: (searchParams) =>
      Boolean(searchParams.city) && Boolean(searchParams.street),
  },
  cases: {
    housingStock: getHousingStockFx,
    apartmentId: getApartmentFx,
    pipeNodeId: setPipeNodeId,
    deviceId: setDeviceId,
    address: setAddress,
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
    toggleTaskCheckbox,
    setSelectedTasks,
    refetchTasks,
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
    $tasksSummaryData,
    $selectedTasks,
  },
  gates: {
    TasksIsOpen,
    InitialGate,
  },
};
