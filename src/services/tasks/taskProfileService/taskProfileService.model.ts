import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { TaskResponse } from 'myApi';
import { fetchTask } from './taskProfileService.api';

const domain = createDomain('taskProfileService');

const $task = domain.createStore<TaskResponse | null>(null);
const getTasksFx = domain.createEffect<number, TaskResponse>(fetchTask);

$task.on(getTasksFx.doneData, (_, task) => task);

const $isLoading = getTasksFx.pending;

const TaskIdGate = createGate<{ taskId: number }>();

forward({
  from: TaskIdGate.open.map(({ taskId }) => taskId),
  to: getTasksFx,
});

export const taskProfileService = {
  inputs: {},
  outputs: { $task, $isLoading },
  gates: { TaskIdGate },
};
