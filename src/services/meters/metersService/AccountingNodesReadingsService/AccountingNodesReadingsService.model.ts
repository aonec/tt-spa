import { createDomain } from 'effector';
import { getElectricNodes } from './AccountingNodesReadingsService.api';
import { GetElectricNodesRequestParams } from './AccountingNodesReadingsService.types';
import { ElectricNodeResponse } from 'myApi';
import _ from 'lodash';

const domain = createDomain('AccountingNodesReadingsService');

const fetchElectricNodesFx = domain.createEffect<
  GetElectricNodesRequestParams,
  ElectricNodeResponse[]
>(getElectricNodes);
const $electricNodes = domain
  .createStore<ElectricNodeResponse[]>([])
  .on(fetchElectricNodesFx.doneData, (_, nodes) => nodes || []);

const $housingStockAddress = $electricNodes.map(
  (nodes) => _.last(nodes)?.address,
);

export const AccountingNodesReadingsService = {
  inputs: {
    $housingStockAddress,
  },
  outputs: {
    $electricNodes,
  },
};
