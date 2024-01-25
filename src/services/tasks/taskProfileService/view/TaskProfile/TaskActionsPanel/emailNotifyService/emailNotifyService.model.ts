import { createEffect, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  ContractorListResponse,
  ContractorListResponsePagedList,
} from 'api/types';
import { getContractors } from './emailNotifyService.api';

const fetchContractorsFx = createEffect<void, ContractorListResponsePagedList>(
  getContractors,
);

const ContractorsGate = createGate();

const $contractors = createStore<ContractorListResponse[] | null>(null)
  .on(fetchContractorsFx.doneData, (_, data) => data.items)
  .reset(ContractorsGate.close);

sample({
  source: $contractors,
  clock: ContractorsGate.open,
  filter: (users) => !users,
  target: fetchContractorsFx,
});

const $contractorsList = $contractors.map((contractors) => contractors || []);

export const emailNotifyService = {
  outputs: {
    $contractors: $contractorsList,
  },
  gates: { ContractorsGate },
};
