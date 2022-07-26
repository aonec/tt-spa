import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { InspectorResponse } from '../../api/types';
import { getInspectors } from './displayInspectorsService.api';

const displayInspectorsServiceDomain = createDomain(
  'displayInspectorsServiceDomain'
);

const $inspectorsList = displayInspectorsServiceDomain.createStore<
  InspectorResponse[] | null
>(null);

const fetchInspectorsListFx = displayInspectorsServiceDomain.createEffect<
  void,
  InspectorResponse[] | null
>(getInspectors);

const $loading = fetchInspectorsListFx.pending;

const InspectorsGate = createGate();

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
