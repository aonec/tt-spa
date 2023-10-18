import { createEffect, createStore } from 'effector';
import { forward } from 'effector';
import { createGate } from 'effector-react';
import { InspectorResponse } from 'api/types';
import { getInspectors } from './displayInspectorsService.api';
import { sortBy } from 'lodash';

const $inspectorsList = createStore<InspectorResponse[] | null>(null);

const fetchInspectorsListFx = createEffect<void, InspectorResponse[] | null>(
  getInspectors,
);

const $loading = fetchInspectorsListFx.pending;

const InspectorsGate = createGate();

$inspectorsList
  .on(fetchInspectorsListFx.doneData, (_, inspectors) => {
    if (!inspectors) return null;

    const filteredInspectors = sortBy(inspectors, 'fullName');

    return filteredInspectors;
  })
  .reset(InspectorsGate.close);

forward({
  from: InspectorsGate.open,
  to: fetchInspectorsListFx,
});

export const displayInspectorsService = {
  inputs: {
    fetchInspectorsListFx,
    InspectorsGate,
  },
  outputs: {
    $inspectorsList,
    $loading,
  },
};
