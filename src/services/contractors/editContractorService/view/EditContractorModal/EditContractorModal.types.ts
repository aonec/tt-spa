import { ContractorUpdateRequest } from 'api/types';
import { ContractorDataType } from '../../editContractorService.types';

export type EditContractorModalProps = {
  isEditModalOpen: boolean;
  contractorData: ContractorDataType | null;
  handleCloseModal: () => void;
  handleEditcontractor: (payload: {
    contractorId: number;
    data: ContractorUpdateRequest;
  }) => void;
};
