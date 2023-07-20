import { ContractorCreateRequest } from 'api/myApi';

export type AddContractorModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleAddcontractor: (payload: ContractorCreateRequest) => void;
};
