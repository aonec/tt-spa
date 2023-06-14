import { forward } from 'effector';
import { createGate } from 'effector-react';
import { districtsQuery } from './distributeRecordsService.api';

const DistributeRecordsGate = createGate();

forward({
  from: DistributeRecordsGate.open,
  to: districtsQuery.start,
});

export const distributeRecordsService = {
  inputs: {},
  outputs: {},
  gates: { DistributeRecordsGate },
};
