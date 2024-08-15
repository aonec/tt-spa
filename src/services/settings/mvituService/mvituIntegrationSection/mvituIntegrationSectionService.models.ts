import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetMvituNodesRequestParams } from './mvituIntegrationSectionService.types';
import { mvituNodesQuery } from './mvituIntegrationSectionService.api';

const MvituSectionGate = createGate();

const $nodesListRequestPayload = createStore<GetMvituNodesRequestParams>({});

sample({
  source: $nodesListRequestPayload,
  clock: MvituSectionGate.open,
  target: mvituNodesQuery.start,
});

export const mvituIntegrationSectionService = {
  inputs: {},
  outputs: {},
  gates: { MvituSectionGate },
};
