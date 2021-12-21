import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { TaskResponse } from 'myApi';

export const $task = createStore<TaskResponse | null>(null);

export const fetchTaskFx = createEffect<number, TaskResponse>();

export const TaskGate = createGate<{ id: number }>();
