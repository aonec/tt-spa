import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { TasksPagedList } from 'myApi';
import { $taskTypes } from '../taskTypesService/taskTypesService.model';
import { getTasks } from './tasksProfileService.api';
import { SeacrhTasksForm } from './view/SearchTasks/SearchTasks.types';

const domain = createDomain('tasksProfileService');

const $tasksPagedData = domain.createStore<TasksPagedList | null>(null);

const $tasks = $tasksPagedData.map((data) => data?.items);
const $observingTasksCount = $tasksPagedData.map(
  (data) => data?.observingTasksCount
);
const $executingTasksCount = $tasksPagedData.map(
  (data) => data?.executingTasksCount
);

const searchTasks = domain.createEvent<SeacrhTasksForm>();
const searchTasksFx = domain.createEffect<any, TasksPagedList>(getTasks);
const $isLoading = searchTasksFx.pending;

$tasksPagedData.on(searchTasksFx.doneData, (_, tasksPaged) => tasksPaged);

const TaskGroupTypeGate = createGate<{ grouptype: string }>();

forward({
  from: TaskGroupTypeGate.open,
  to: searchTasksFx,
});

sample({
  source: TaskGroupTypeGate.state,
  clock: searchTasks,
  fn: (grouptype, formFilter) => ({ ...grouptype, ...formFilter }),
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
