import { createEffect, createStore } from 'effector';
import { forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractorListResponse } from 'api/types';
import { getContractors } from './displayContractorsService.api';

const ContractorsGate = createGate();

const getContractorsFx = createEffect<void, ContractorListResponse[]>(
  getContractors,
);

const $contractors = createStore<ContractorListResponse[] | null>(null).on(
  getContractorsFx.doneData,
  (_, contractors) => contractors,
);

forward({
  from: ContractorsGate.open,
  to: getContractorsFx,
});

export const displayContractorsService = {
  outputs: { $contractors },
  gates: { ContractorsGate },
};
