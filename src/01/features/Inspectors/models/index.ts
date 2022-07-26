import { InspectorResponse } from './../.../../api/types';
import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';

export const $inspector = createStore<InspectorResponse | null>(null);

export const fetchInspectorFx = createEffect<number, InspectorResponse>();

export const InspectorGate = createGate<{ id: number }>();
