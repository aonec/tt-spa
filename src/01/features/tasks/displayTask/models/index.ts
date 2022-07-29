import { createEffect, createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';
import { TaskResponse } from '../../../../../api/types';

export const $task = createStore<TaskResponse | null>(null);

export const fetchTaskFx = createEffect<number, TaskResponse>();

export const TaskGate = createGate<{ id: number }>();

export const refetchTask = createEvent();
