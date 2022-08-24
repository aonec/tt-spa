import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import {
  ApartmentResponse,
  ESecuredIdentityRoleName,
  ETaskEngineeringElement,
  TaskGroupingFilter,
  TasksPagedList,
} from 'myApi';
import { currentUserService } from 'services/currentUserService';
import {
  $taskTypes,
  $housingManagments,
  $perpetratorIdStore,
} from '../taskTypesService/taskTypesService.model';
import { fetchApartment, getTasks } from './tasksProfileService.api';
import { GetTasksListRequestPayload } from './tasksProfileService.types';
import { getApartmentAddressObject } from './tasksProfileService.utils';
import { SearchTasksForm } from './view/SearchTasks/SearchTasks.types';

const domain = createDomain('tasksProfileService');

const $apartment = domain.createStore<ApartmentResponse | null>(null);

const $searchState = domain.createStore<GetTasksListRequestPayload>({
  GroupType: TaskGroupingFilter.Executing,
});

const $tasksPagedData = domain.createStore<TasksPagedList | null>(null);
const $isExtendedSearchOpen = domain.createStore(false);

const clearFilters = domain.createEvent();
const extendedSearchOpened = domain.createEvent();
const extendedSearchClosed = domain.createEvent();

const changeFiltersByGroupType = domain.createEvent<TaskGroupingFilter>();
const changeGroupType = domain.createEvent<TaskGroupingFilter>();
const changePageNumber = domain.createEvent<number>();

const searchTasks = domain.createEvent<SearchTasksForm>();

const searchTasksFx = domain.createEffect<
  GetTasksListRequestPayload | null,
  TasksPagedList
>(getTasks);

const getApartmentFx = domain.createEffect<string, ApartmentResponse>(
  fetchApartment
);

$apartment.on(getApartmentFx.doneData, (_, apartment) => apartment);

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

const TasksIsOpen = createGate();
const ApartmentIdGate = createGate<{ apartmentId: string }>();

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
  .on($apartment, (searchFilter, apartment) => {
    const apartmentAddress = getApartmentAddressObject(apartment);

    return {
      ...searchFilter,
      ...apartmentAddress,
      EngineeringElement: ETaskEngineeringElement.IndividualDevice,
    };
  })
  .reset(clearFilters);

forward({
  from: TasksIsOpen.close,
  to: clearFilters,
});

forward({
  from: $searchState,
  to: searchTasksFx,
});

forward({
  from: ApartmentIdGate.state.map(({ apartmentId }) => apartmentId),
  to: getApartmentFx,
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
    $apartment,
  },
  gates: {
    TasksIsOpen,
    ApartmentIdGate,
  },
};
