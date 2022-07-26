import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { TaskGroupingFilter, TasksPagedList } from '../../api/types';
import { $taskTypes, $housingManagments } from '../taskTypesService/taskTypesService.model';
import { getTasks } from './tasksProfileService.api';
import { GetTasksListRequestPayload } from './tasksProfileService.types';
import { SearchTasksForm } from './view/SearchTasks/SearchTasks.types';

const domain = createDomain('tasksProfileService');

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
const $isLoading = searchTasksFx.pending;

$tasksPagedData.on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);

const TasksIsOpen = createGate();

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
  .reset(clearFilters);

forward({
  from: TasksIsOpen.close,
  to: clearFilters,
});

forward({
  from: $searchState,
  to: searchTasksFx,
});

export const tasksProfileService = {
  inputs: {
    searchTasks,
    changeFiltersByGroupType,
    changeGroupType,
    changePageNumber,
    extendedSearchClosed,
    extendedSearchOpened,
    clearFilters
  },
  outputs: {
    $taskTypes,
    $isLoading,
    $searchState,
    $tasksPagedData,
    $isExtendedSearchOpen,
    $housingManagments
  },
  gates: {
    TasksIsOpen,
  },
};
