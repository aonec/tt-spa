import { ContractorListResponsePagedList } from 'api/myApi';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

export type ContractorsProps = {
  conractorsList: ContractorListResponsePagedList | null;
  isLoadingContractors: boolean;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenEditContractorModal: () => void;
  catchContractorData: (payload: ContractorDataType) => void;
};
