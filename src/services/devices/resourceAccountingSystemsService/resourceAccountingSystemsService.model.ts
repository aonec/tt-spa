import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { EResourceType, NodeOnHousingStockResponse } from 'api/types';
import { getNodes } from './resourceAccountingSystemsService.api';
import { sortNodes } from './resourceAccountingSystemsService.utils';
import { meteringDevicesService } from './view/ResourceAccountingSystems/meteringDevicesService';

const fetchNodesFx = createEffect<number, NodeOnHousingStockResponse[] | null>(
  getNodes,
);

const NodesGate = createGate<{ buildingId: number }>();

const $nodes = createStore<NodeOnHousingStockResponse[] | null>(null)
  .on(fetchNodesFx.doneData, (_, nodes) => {
    if (!nodes) return [];

    return sortNodes(
      nodes.filter((node) => node.resource !== EResourceType.Electricity),
    );
  })
  .reset(NodesGate.close);

sample({
  clock: NodesGate.open.map(({ buildingId }) => buildingId),
  target: fetchNodesFx,
});

const $isLoading = fetchNodesFx.pending;

export const resourceAccountingSystemsService = {
  inputs: {
    openDevicesListModal: meteringDevicesService.inputs.openDevicesListModal,
  },
  outputs: { $nodes, $isLoading },
  gates: { NodesGate },
};
