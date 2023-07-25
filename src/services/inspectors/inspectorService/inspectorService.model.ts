import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { InspectorResponse } from 'api/types';
import { getInspector } from './inspectorService.api';

const domain = createDomain('inspectorService');

const $inspector = domain.createStore<InspectorResponse | null>(null);

const fetchInspectorFx = domain.createEffect<number, InspectorResponse>();

const InspectorGate = createGate<{ id: number }>();

fetchInspectorFx.use(getInspector);

$inspector
  .on(fetchInspectorFx.doneData, (_, inspector) => inspector)
  .reset(InspectorGate.close);

forward({
  from: InspectorGate.state.map(({ id }) => id),
  to: fetchInspectorFx,
});

export const inspectorService = {
  outputs: {
    $inspector,
  },
  gates: {
    InspectorGate,
  },
};
