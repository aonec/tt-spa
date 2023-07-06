import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { EResourceType, NodeOnHousingStockResponse } from 'myApi';
import { getNodes } from './resourceAccountingSystemsService.api';
import { sortNodes } from './resourceAccountingSystemsService.utils';
import { meteringDevicesService } from './view/ResourceAccountingSystems/meteringDevicesService';

const domain = createDomain('resourceAccountingSystemsService');

const fetchNodesFx = domain.createEffect<
  number,
  NodeOnHousingStockResponse[] | null
>(getNodes);

const NodesGate = createGate<{ buildingId: number }>();

const $nodes = domain
  .createStore<NodeOnHousingStockResponse[] | null>(null)
  .on(fetchNodesFx.doneData, (_, nodes) => {
    if (!nodes) return [];

    return sortNodes(
      nodes.filter((node) => node.resource !== EResourceType.Electricity),
    );
  })
  .reset(NodesGate.close);

forward({
  from: NodesGate.open.map(({ buildingId }) => buildingId),
  to: fetchNodesFx,
});

const $isLoading = fetchNodesFx.pending;

export const resourceAccountingSystemsService = {
  inputs: {
    openDevicesListModal: meteringDevicesService.inputs.openDevicesListModal,
  },
  outputs: { $nodes, $isLoading },
  gates: { NodesGate },
};
