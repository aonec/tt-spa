import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { NodeCheckResponse } from 'myApi';
import { GetNodeChecksRequest } from './types';
import { forward } from 'effector';
import { axios } from '01/axios';

const displayNodeChecksDomain = createDomain('displayNodeChecksDomain');

const $nodeChecks = displayNodeChecksDomain.createStore<
  NodeCheckResponse[] | null
>(null);

const fetchNodeChecksFx = displayNodeChecksDomain.createEffect<
  GetNodeChecksRequest,
  NodeCheckResponse[] | null
>((payload) =>
  axios.get(`Nodes/${payload.NodeId}/Checks`, { params: payload })
);

const NodeChecksGate = createGate<GetNodeChecksRequest>();

$nodeChecks
  .on(fetchNodeChecksFx.doneData, (_, checks) => checks)
  .reset(NodeChecksGate.close);

forward({
  from: NodeChecksGate.open,
  to: fetchNodeChecksFx,
});

export const nodeChecksService = {
  inputs: {
    NodeChecksGate,
  },
  outputs: {
    $nodeChecks,
    $loading: fetchNodeChecksFx.pending,
  },
};
