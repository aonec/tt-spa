import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { PipeNodeResponse, TaskResponse } from 'myApi';
import { fetchNode, fetchTask } from './taskProfileService.api';

const domain = createDomain('taskProfileService');

const getTasksFx = domain.createEffect<number, TaskResponse>(fetchTask);
const getNodeFx = domain.createEffect<number, PipeNodeResponse>(fetchNode);

const $pipeNode = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(getNodeFx.doneData, (_, pipeNode) => pipeNode);

const $task = domain
  .createStore<TaskResponse | null>(null)
  .on(getTasksFx.doneData, (_, task) => task);

const $isLoading = getTasksFx.pending;

const TaskIdGate = createGate<{ taskId: number }>();
const RelatedNodeIdGate = createGate<{ nodeId: number }>();

forward({
  from: TaskIdGate.open.map(({ taskId }) => taskId),
  to: getTasksFx,
});

forward({
  from: RelatedNodeIdGate.state.map(({ nodeId }) => nodeId),
  to: getNodeFx,
});

export const taskProfileService = {
  outputs: { $task, $isLoading, $pipeNode },
  gates: { TaskIdGate, RelatedNodeIdGate },
};
