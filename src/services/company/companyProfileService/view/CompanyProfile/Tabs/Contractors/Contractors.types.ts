import { ContractorListResponsePagedList } from 'myApi';

export type ContractorsProps = {
  conractorsList: ContractorListResponsePagedList | null;
  fetchContractorsPending: boolean;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenDeleteContractorModal: () => void;
};
