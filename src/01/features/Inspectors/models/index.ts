import { createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { InspectorResponse } from '../../../../api/types';

export const $inspector = createStore<InspectorResponse | null>(null);

export const fetchInspectorFx = createEffect<number, InspectorResponse>();

export const InspectorGate = createGate<{ id: number }>();
