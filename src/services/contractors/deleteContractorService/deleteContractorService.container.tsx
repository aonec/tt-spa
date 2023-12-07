import { useUnit } from 'effector-react';
import React from 'react';
import { deleteContractorService } from './deleteContractorService.model';
import { DeleteContractorModal } from './view/DeleteContractorModal';

const { inputs, outputs } = deleteContractorService;

export const DeleteContractorContainer = () => {
  const {
    contractorData,
    handleCloseModal,
    handleDeleteContractor,
    isModalOpen,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    contractorData: outputs.$contractorData,
    handleCloseModal: inputs.handleCloseModal,
    handleDeleteContractor: inputs.handleDeleteContractor,
  });

  return (
    <>
      <DeleteContractorModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        handleDeleteContractor={() => handleDeleteContractor()}
        contractorData={contractorData}
      />
    </>
  );
};
