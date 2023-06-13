import { createDomain, sample } from 'effector';
import { fetchReadingsOfElectricNode } from './accountingNodesReadingsInputService.api';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { createGate } from 'effector-react';

const domain = createDomain('accountingNodesReadingsInputService');

const refetchReadings = domain.createEvent();

const getReadingsOfElectricNodeFx = domain.createEffect<
  number,
  HousingMeteringDeviceReadingsIncludingPlacementResponse[]
>(fetchReadingsOfElectricNode);
const $readings = domain
  .createStore<HousingMeteringDeviceReadingsIncludingPlacementResponse[]>([])
  .on(getReadingsOfElectricNodeFx.doneData, (_, readings) => readings);

const AccountingNodesReadingsInputGate = createGate<{ nodeId: number }>();

sample({
  source: AccountingNodesReadingsInputGate.state.map(({ nodeId }) => nodeId),
  clock: [refetchReadings, AccountingNodesReadingsInputGate.open],
  target: getReadingsOfElectricNodeFx,
});

export const accountingNodesReadingsInputService = {
  inputs: {},
  outputs: {
    $readings,
  },
  gates: { AccountingNodesReadingsInputGate },
};
