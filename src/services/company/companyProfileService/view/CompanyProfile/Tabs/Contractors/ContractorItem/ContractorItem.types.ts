import { ContractorListResponse } from 'myApi';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

export type ContractorItemProps = {
  contractor: ContractorListResponse;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenDeleteContractorModal: () => void;
  handleOpenEditContractorModal: () => void;
  catchContractorData: (payload: ContractorDataType) => void;
};
