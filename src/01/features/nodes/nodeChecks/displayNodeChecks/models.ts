import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetNodeChecksRequest } from './types';
import { forward } from 'effector';
import { NodeCheckResponse, NodeCheckResponsePagedList } from '../../../../../api/types';
import { axios } from '../../../../../api/axios';

const displayNodeChecksDomain = createDomain('displayNodeChecksDomain');

const $nodeChecks = displayNodeChecksDomain.createStore<
  NodeCheckResponse[] | null
>(null);

const fetchNodeChecksFx = displayNodeChecksDomain.createEffect<
  GetNodeChecksRequest,
  NodeCheckResponse[] | null
>(async (payload) => {
  const res: NodeCheckResponsePagedList = await axios.get(
    `Nodes/${payload.NodeId}/Checks`
  );

  return res?.items;
});

const refetchNodeChecks = displayNodeChecksDomain.createEvent();

const NodeChecksGate = createGate<GetNodeChecksRequest>();

$nodeChecks
  .on(fetchNodeChecksFx.doneData, (_, checks) => checks)
  .reset(NodeChecksGate.close);

forward({
  from: NodeChecksGate.open,
  to: fetchNodeChecksFx,
});

sample({
  source: NodeChecksGate.state,
  clock: refetchNodeChecks,
  target: fetchNodeChecksFx,
});

export const nodeChecksService = {
  inputs: {
    NodeChecksGate,
    refetchNodeChecks,
  },
  outputs: {
    $nodeChecks,
    $loading: fetchNodeChecksFx.pending,
  },
};
