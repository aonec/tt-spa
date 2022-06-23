import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { TaskGroupingFilter, TasksPagedList } from 'myApi';
import { $taskTypes } from '../taskTypesService/taskTypesService.model';
import { getTasks } from './tasksProfileService.api';
import { GetTasksListRequestPayload } from './tasksProfileService.types';
import { SearchTasksForm } from './view/SearchTasks/SearchTasks.types';

const domain = createDomain('tasksProfileService');

const $searchState = domain.createStore<GetTasksListRequestPayload>({});

const $tasksPagedData = domain.createStore<TasksPagedList | null>(null);

const $tasks = $tasksPagedData.map((data) => data?.items);
const $observingTasksCount = $tasksPagedData.map(
  (data) => data?.observingTasksCount
);
const $executingTasksCount = $tasksPagedData.map(
  (data) => data?.executingTasksCount
);

const searchTasks = domain.createEvent<SearchTasksForm>();
const searchTasksFx = domain.createEffect<
  GetTasksListRequestPayload,
  TasksPagedList
>(getTasks);
const $isLoading = searchTasksFx.pending;

$tasksPagedData.on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);
$searchState.on(searchTasks, (_, filters) => ({ ...filters, PageNumber: 1 }));

const TaskGroupTypeGate = createGate<{ GroupType: TaskGroupingFilter }>();

sample({
  clock: TaskGroupTypeGate.open,
  target: searchTasksFx as any,
});

sample({
  source: [TaskGroupTypeGate.state, $searchState],
  clock: [TaskGroupTypeGate.state, $searchState],
  fn: (searchTasksPayload) =>
    searchTasksPayload.reduce((filters, currentFilter) => ({
      ...currentFilter,
      ...filters,
    })),
  target: searchTasksFx,
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
  },
  gates: {
    TaskGroupTypeGate,
  },
};
