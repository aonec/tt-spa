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
const searchTasks = domain.createEvent<SearchTasksForm>();
const searchTasksFx = domain.createEffect<
  GetTasksListRequestPayload | null,
  TasksPagedList
>(getTasks);
const $isLoading = searchTasksFx.pending;

$tasksPagedData.on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);

const TaskGroupTypeGate = createGate<{ GroupType: TaskGroupingFilter }>();

$searchState
  .reset(clearFilters)
  .on(searchTasks, (oldFilters, filters) => ({
    ...oldFilters,
    ...filters,
    PageNumber: 1,
  }))
  .on(TaskGroupTypeGate.state, (filters, GroupType) => ({
    ...filters,
    ...GroupType,
  }));

forward({
  from: TaskGroupTypeGate.close,
  to: clearFilters,
});

forward({
  from: $searchState,
  to: searchTasksFx,
});

export const tasksProfileService = {
  inputs: {
    searchTasks,
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
    TaskGroupTypeGate,
  },
};
