import { createDomain, sample } from 'effector';
import { getElectricNodes } from './AccountingNodesReadingsService.api';
import {
  GetElectricNodesByAddress,
  GetElectricNodesRequestParams,
} from './AccountingNodesReadingsService.types';
import { ElectricNodeResponse } from 'myApi';
import { createGate } from 'effector-react';

const domain = createDomain('AccountingNodesReadingsService');

const HousingStockIdGate = createGate<{ id?: number }>();

const fetchElectricNodes = domain.createEvent<GetElectricNodesByAddress>();
const fetchElectricNodesFx = domain.createEffect<
  GetElectricNodesRequestParams,
  ElectricNodeResponse[]
>(getElectricNodes);
const $electricNodes = domain
  .createStore<ElectricNodeResponse[]>([])
  .on(fetchElectricNodesFx.doneData, (_, nodes) => nodes || [])
  .reset(HousingStockIdGate.close);

const $housingStockAddress = $electricNodes.map((nodes) => {
  if (nodes.length) {
    return nodes[0].address?.address?.mainAddress || null;
  }
  return null;
});

const $isLoading = fetchElectricNodesFx.pending;

sample({
  source: HousingStockIdGate.state.map(({ id }) => ({ HousingStockId: id })),
  clock: sample({
    source: $housingStockAddress,
    clock: HousingStockIdGate.state,
    filter: (housingStock, { id }) =>
      Boolean(id && id !== housingStock?.housingStockId),
  }),
  target: fetchElectricNodesFx,
});

sample({
  clock: fetchElectricNodes,
  target: fetchElectricNodesFx,
});

export const AccountingNodesReadingsService = {
  inputs: {
    fetchElectricNodes,
  },
  outputs: {
    $electricNodes,
    $housingStockAddress,
    $isLoading,
  },
  gates: {
    HousingStockIdGate,
  },
};
