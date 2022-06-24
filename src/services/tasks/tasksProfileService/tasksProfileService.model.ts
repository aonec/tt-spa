import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { TaskGroupingFilter, TasksPagedList } from 'myApi';
import { $taskTypes } from '../taskTypesService/taskTypesService.model';
import { getTasks } from './tasksProfileService.api';
import { GetTasksListRequestPayload } from './tasksProfileService.types';
import { SearchTasksForm } from './view/SearchTasks/SearchTasks.types';

const domain = createDomain('tasksProfileService');

const $searchState = domain.createStore<GetTasksListRequestPayload | null>(
  null
);

const $tasksPagedData = domain.createStore<TasksPagedList | null>(null);

const $tasks = $tasksPagedData.map((data) => data?.items);
const $observingTasksCount = $tasksPagedData.map(
  (data) => data?.observingTasksCount
);
const $executingTasksCount = $tasksPagedData.map(
  (data) => data?.executingTasksCount
);

const clearFilters = domain.createEvent();

const changeFiltersByGroupType = domain.createEvent<TaskGroupingFilter>();
const changeGroupType =  domain.createEvent<TaskGroupingFilter>();

const searchTasks = domain.createEvent<SearchTasksForm>();
const searchTasksFx = domain.createEffect<
  GetTasksListRequestPayload | null,
  TasksPagedList
>(getTasks);
const $isLoading = searchTasksFx.pending;

$tasksPagedData.on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);

const TasksProfileIsOpen = createGate();

$searchState
.on(searchTasks, (oldFilters, filters) => ({
  ...oldFilters,
  ...filters,
  PageNumber: 1,
}))
.on(changeFiltersByGroupType, (_, GroupType) => ({ GroupType }))
.on(changeGroupType, (filters, GroupType) => ({...filters, GroupType}))
.reset(clearFilters)

forward({
  from: TasksProfileIsOpen.close,
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
  },
  outputs: {
    $taskTypes,
    $tasks,
    $executingTasksCount,
    $observingTasksCount,
    $isLoading,
    $searchState,
  },
  gates: {
    TasksProfileIsOpen,
  },
};
