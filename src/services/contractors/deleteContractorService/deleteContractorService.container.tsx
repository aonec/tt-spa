import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { deleteContractorService } from './deleteContractorService.model';
import { DeleteContractorModal } from './view/DeleteContractorModal';

const { inputs, outputs } = deleteContractorService;

export const DeleteContractorContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);
  const contractorData = useStore(outputs.$contractorData);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const handleDeleteContractor = useEvent(inputs.handleDeleteContractor);

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
