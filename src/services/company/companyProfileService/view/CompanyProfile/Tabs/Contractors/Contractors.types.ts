import { ContractorListResponsePagedList } from 'myApi';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

export type ContractorsProps = {
  conractorsList: ContractorListResponsePagedList | null;
  fetchContractorsPending: boolean;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenDeleteContractorModal: () => void;
  handleOpenEditContractorModal: () => void;
  catchContractorData: (payload: ContractorDataType) => void;
};
