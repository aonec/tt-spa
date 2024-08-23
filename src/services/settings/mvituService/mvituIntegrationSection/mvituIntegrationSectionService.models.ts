import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetMvituNodesRequestParams } from './mvituIntegrationSectionService.types';
import {
  changeNodeStatusMutation,
  mvituNodesQuery,
} from './mvituIntegrationSectionService.api';

const MvituSectionGate = createGate();

const $nodesListRequestPayload = createStore<GetMvituNodesRequestParams>({});

const refetchNodesQuery = createEvent();

sample({
  source: $nodesListRequestPayload,
  clock: [
    MvituSectionGate.open,
    refetchNodesQuery,
    changeNodeStatusMutation.finished.success,
  ],
  target: mvituNodesQuery.start,
});

export const mvituIntegrationSectionService = {
  inputs: { refetchNodesQuery },
  outputs: {},
  gates: { MvituSectionGate },
};
