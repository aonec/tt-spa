import { ContractorCreateRequest } from "myApi";

export type AddContractorModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleAddcontractor: (payload: ContractorCreateRequest) => void;
};
