import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { EResourceType, NodeOnHousingStockResponse } from 'myApi';
import { getNodes } from './resourceAccountingSystemsService.api';

const domain = createDomain('resourceAccountingSystemsService');

const fetchNodesFx = domain.createEffect<
  number,
  NodeOnHousingStockResponse[] | null
>(getNodes);

const NodesGate = createGate<{ housingStockId: number }>();

const $nodes = domain
  .createStore<NodeOnHousingStockResponse[]>([])
  .on(
    fetchNodesFx.doneData,
    (_, nodes) =>
      nodes?.filter((node) => node.resource !== EResourceType.Electricity) || []
  )
  .reset(NodesGate.close);

forward({
  from: NodesGate.open.map(({ housingStockId }) => housingStockId),
  to: fetchNodesFx,
});

const $isLoading = fetchNodesFx.pending;

export const resourceAccountingSystemsService = {
  outputs: { $nodes, $isLoading },
  gates: { NodesGate },
};
