import { createDomain, forward, guard, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  ESecuredIdentityRoleName,
  HousingStockResponse,
  TaskGroupingFilter,
  TasksPagedList,
} from 'api/myApi';
import { currentUserService } from 'services/currentUserService';
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

const domain = createDomain('tasksProfileService');

const clearAddress = domain.createEvent();
const clearFilters = domain.createEvent();

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

const setPipeNodeId = domain.createEvent<{ pipeNodeId: string }>();
const setDeviceId = domain.createEvent<{
  deviceId: string;
}>();

const setTasksPageSegment = domain.createEvent<TasksPageSegment>();

const $searchState = domain
  .createStore<GetTasksListRequestPayload>({})
  .on(setPipeNodeId, (prev, { pipeNodeId }) => ({
    ...prev,
    PipeNodeId: Number(pipeNodeId),
  }))
  .on(setDeviceId, (prev, { deviceId }) => ({
    ...prev,
    DeviceId: Number(deviceId),
  }));

const $tasksPagedData = domain.createStore<TasksPagedList | null>(null);
const $isExtendedSearchOpen = domain.createStore(false);
const $tasksPageSegment = domain
  .createStore<TasksPageSegment>('list')
  .on(setTasksPageSegment, (_, segment) => segment);

const extendedSearchOpened = domain.createEvent();
const extendedSearchClosed = domain.createEvent();

const changeFiltersByGroupType = domain.createEvent<TaskGroupingFilter>();
const changeGroupType = domain.createEvent<TaskGroupingFilter>();
const changePageNumber = domain.createEvent<number>();

const searchTasks = domain.createEvent<GetTasksListRequestPayload>();

const searchTasksFx = domain.createEffect<
  GetTasksListRequestPayload | null,
  TasksPagedList
>(getTasks);

const $isLoading = searchTasksFx.pending;

const $isSpectator = currentUserService.outputs.$currentUser.map((user) => {
  const roles = user?.roles || [];
  const rolesKeys = roles.map(({ key }) => key);
  const isSpectator =
    rolesKeys.includes(ESecuredIdentityRoleName.ManagingFirmSpectator) ||
    rolesKeys.includes(
      ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
    );

  return isSpectator;
});

const $isAdministrator = currentUserService.outputs.$currentUser.map((user) => {
  const roles = user?.roles || [];
  const rolesKeys = roles.map(({ key }) => key);
  const isAdministrator = rolesKeys.includes(
    ESecuredIdentityRoleName.Administrator,
  );

  return isAdministrator;
});

const TasksIsOpen = createGate();
const FiltersGate = createGate<FiltersGatePayload>();

$tasksPagedData.on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);

$isExtendedSearchOpen
  .on(extendedSearchOpened, () => true)
  .reset(extendedSearchClosed);

$searchState
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
  .on(addressSearchService.outputs.$existingCities, (prev, cities) => ({
    ...prev,
    City: cities?.length ? cities[cities.length - 1] : undefined,
  }))
  .reset(clearFilters);

forward({
  from: TasksIsOpen.close,
  to: clearFilters,
});

sample({
  source: guard({
    source: addressSearchService.outputs.$existingCities,
    filter: (cities) => Boolean(cities),
  }),
  clock: guard({
    clock: $searchState,
    filter: (filter) => Boolean(filter.GroupType),
  }),
  fn: (_, filter) => filter,
  target: searchTasksFx,
});

split({
  source: guard({
    clock: FiltersGate.state,
    filter: ({ apartmentId, housingStockId, pipeNodeId, deviceId }) =>
      [apartmentId, housingStockId, pipeNodeId, deviceId].some(Boolean),
  }),
  match: {
    housingStock: (ids) => Boolean(ids.housingStockId),
    apartmentId: (ids) => Boolean(ids.apartmentId),
    pipeNodeId: (ids) => Boolean(ids.pipeNodeId),
    deviceId: (ids) => Boolean(ids.deviceId),
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
    $isSpectator,
    $isAdministrator,
    $apartment,
    $housingStock,
    $tasksPageSegment,
  },
  gates: {
    TasksIsOpen,
    ApartmentIdGate: FiltersGate,
  },
};
