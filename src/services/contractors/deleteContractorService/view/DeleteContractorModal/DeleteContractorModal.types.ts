export type DeleteContractorModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteContractor: () => void;
  contractorData: {
    id: number;
    name: string | null;
  } | null;
};
