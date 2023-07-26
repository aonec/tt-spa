import { ContractorListResponse } from 'api/types';
import { ContractorDataType } from 'services/contractors/editContractorService/editContractorService.types';

export type ContractorItemProps = {
  contractor: ContractorListResponse;
  catchContractorId: (payload: { id: number; name: string | null }) => void;
  handleOpenEditContractorModal: () => void;
  catchContractorData: (payload: ContractorDataType) => void;
};
