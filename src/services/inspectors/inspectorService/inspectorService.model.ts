import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { InspectorResponse } from 'api/types';
import { getInspector } from './inspectorService.api';

const $inspector = createStore<InspectorResponse | null>(null);

const fetchInspectorFx = createEffect<number, InspectorResponse>();

const InspectorGate = createGate<{ id: number }>();

fetchInspectorFx.use(getInspector);

$inspector
  .on(fetchInspectorFx.doneData, (_, inspector) => inspector)
  .reset(InspectorGate.close);

sample({
  clock: InspectorGate.state.map(({ id }) => id || null),
  filter: (id): id is number => Boolean(id),
  target: fetchInspectorFx,
});

export const inspectorService = {
  outputs: {
    $inspector,
  },
  gates: {
    InspectorGate,
  },
};
