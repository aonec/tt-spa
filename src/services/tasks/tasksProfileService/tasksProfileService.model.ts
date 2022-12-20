import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { combine, createDomain, forward, guard, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  ESecuredIdentityRoleName,
  ETaskEngineeringElement,
  HousingStockResponse,
  TaskGroupingFilter,
  TasksPagedList,
} from 'myApi';
import { currentUserService } from 'services/currentUserService';
import {
  $taskTypes,
  $housingManagments,
  $perpetratorIdStore,
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

const domain = createDomain('tasksProfileService');

const clearAddress = domain.createEvent();

const getApartmentFx = domain.createEffect<
  { apartmentId: string },
  ApartmentResponse
>(fetchApartment);
const $apartment = domain
  .createStore<ApartmentResponse | null>(null)
  .on(getApartmentFx.doneData, (_, apartment) => apartment)
  .reset(clearAddress);

const getHousingStockFx = domain.createEffect<
  { housingStockId: string },
  HousingStockResponse
>(fetchHousingStock);
const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(getHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(clearAddress);

const setPipeNodeId = domain.createEvent<{ pipeNodeId: string }>();

const $searchState = domain
  .createStore<GetTasksListRequestPayload>({})
  .on(setPipeNodeId, (prev, { pipeNodeId }) => ({
    ...prev,
    PipeNodeId: Number(pipeNodeId),
  }));

const $tasksPagedData = domain.createStore<TasksPagedList | null>(null);
const $isExtendedSearchOpen = domain.createStore(false);

const clearFilters = domain.createEvent();
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
      ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted
    );

  return isSpectator;
});

const $isAdministrator = currentUserService.outputs.$currentUser.map((user) => {
  const roles = user?.roles || [];
  const rolesKeys = roles.map(({ key }) => key);
  const isAdministrator = rolesKeys.includes(
    ESecuredIdentityRoleName.Administrator
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
  .on(changeFiltersByGroupType, (_, GroupType) => ({
    GroupType,
    PageNumber: 1,
  }))
  .on(changeGroupType, (filters, GroupType) => ({
    ...filters,
    GroupType,
    PageNumber: 1,
  }))
  .on(changePageNumber, (filters, PageNumber) => ({ ...filters, PageNumber }))
  .on($existingCities, (prev, cities) => ({
    ...prev,
    City: cities?.length ? cities[cities.length - 1] : undefined,
  }))
  .reset(clearFilters);

forward({
  from: TasksIsOpen.close,
  to: clearFilters,
});

sample({
  clock: guard({
    clock: $searchState,
    filter: (filter) => Boolean(filter.GroupType),
  }),
  target: searchTasksFx,
});

split({
  source: guard({
    clock: FiltersGate.state,
    filter: ({ apartmentId, housingStockId, pipeNodeId }) =>
      [apartmentId, housingStockId, pipeNodeId].some(Boolean),
  }),
  match: {
    housingStock: (ids) => Boolean(ids.housingStockId),
    apartmentId: (ids) => Boolean(ids.apartmentId),
    pipeNodeId: (ids) => Boolean(ids.pipeNodeId),
  },
  cases: {
    apartmentId: getApartmentFx,
    housingStock: getHousingStockFx,
    pipeNodeId: setPipeNodeId,
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
  },
  outputs: {
    $taskTypes,
    $isLoading,
    $searchState,
    $tasksPagedData,
    $isExtendedSearchOpen,
    $housingManagments,
    $perpetratorIdStore,
    $isSpectator,
    $isAdministrator,
    $apartment,
    $housingStock,
  },
  gates: {
    TasksIsOpen,
    ApartmentIdGate: FiltersGate,
  },
};
