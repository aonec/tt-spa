import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
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

sample({
  clock: ContractorsGate.open,
  target: getContractorsFx,
});

export const displayContractorsService = {
  outputs: { $contractors },
  gates: { ContractorsGate },
};
