import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { InspectorResponse } from 'api/types';
import { getInspectors } from './displayInspectorsService.api';
import { sortBy } from 'lodash';

const $inspectorsList = createStore<InspectorResponse[] | null>(null);

const fetchInspectorsListFx = createEffect<void, InspectorResponse[] | null>(
  getInspectors,
);

const refetchInspectors = createEvent();

const $loading = fetchInspectorsListFx.pending;

const InspectorsGate = createGate();

$inspectorsList
  .on(fetchInspectorsListFx.doneData, (_, inspectors) => {
    if (!inspectors) return null;

    const filteredInspectors = sortBy(inspectors, 'fullName');

    return filteredInspectors;
  })
  .reset(InspectorsGate.close);

sample({
  clock: [InspectorsGate.open, refetchInspectors],
  target: fetchInspectorsListFx,
});

export const displayInspectorsService = {
  inputs: {
    fetchInspectorsListFx,
    InspectorsGate,
    refetchInspectors,
  },
  outputs: {
    $inspectorsList,
    $loading,
  },
};
