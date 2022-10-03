import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { NodeOnHousingStockResponse } from 'myApi';

const domain = createDomain('resourceAccountingSystemsService');

const fetchNodesFx = domain.createEffect<
  number,
  NodeOnHousingStockResponse[] | null
>();

const NodesGate = createGate<{ housingStockId: number }>();

const $nodes = domain
  .createStore<NodeOnHousingStockResponse[] | null>(null)
  .on(fetchNodesFx.doneData, (_, nodes) => nodes)
  .reset(NodesGate.close);

forward({
  from: NodesGate.open.map(({ housingStockId }) => housingStockId),
  to: fetchNodesFx,
});

export const resourceAccountingSystemsService = {
  outputs: { $nodes },
  gates: { NodesGate },
};
