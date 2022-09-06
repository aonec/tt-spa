import { createDomain, guard } from 'effector';
import { createGate } from 'effector-react';
import { ContractorListResponse, ContractorListResponsePagedList } from 'myApi';
import { getContractors } from './emailNotifyService.api';

const domain = createDomain('emailNotifyService');

const fetchContractorsFx = domain.createEffect<
  void,
  ContractorListResponsePagedList
>(getContractors);

const ContractorsGate = createGate();

const $contractors = domain
  .createStore<ContractorListResponse[] | null>(null)
  .on(fetchContractorsFx.doneData, (_, data) => data.items)
  .reset(ContractorsGate.close);

guard({
  source: $contractors,
  clock: ContractorsGate.open,
  filter: (users) => !users,
  target: fetchContractorsFx,
});

export const emailNotifyService = {
  outputs: {
    $contractors: $contractors.map((contractors) => contractors || []),
  },
  gates: { ContractorsGate },
};
