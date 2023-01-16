import { ContractorListResponsePagedList } from 'myApi';

export type ContractorsProps = {
  conractorsList: ContractorListResponsePagedList | null;
  fetchContractorsPending: boolean;
};
