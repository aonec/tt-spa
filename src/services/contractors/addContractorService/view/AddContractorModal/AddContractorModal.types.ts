import { ContractorCreateRequest } from 'api/types';

export type AddContractorModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleAddcontractor: (payload: ContractorCreateRequest) => void;
};
