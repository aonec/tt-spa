import { createDomain, createEvent, forward } from 'effector';
import { createGate } from 'effector-react';
import { districtsQuery } from './distributeRecordsService.api';

const domain = createDomain('distributeRecords');

const DistributeRecordsGate = createGate();

const handleUnselectDistrict = createEvent();

const handleSelectDistrict = domain.createEvent<string>();

const $selectedDistrict = domain
  .createStore<string | null>(null)
  .on(handleSelectDistrict, (_, id) => id)
  .reset(DistributeRecordsGate.close, handleUnselectDistrict);

forward({
  from: DistributeRecordsGate.open,
  to: districtsQuery.start,
});

export const distributeRecordsService = {
  inputs: { handleSelectDistrict, handleUnselectDistrict },
  outputs: { $selectedDistrict },
  gates: { DistributeRecordsGate },
};
