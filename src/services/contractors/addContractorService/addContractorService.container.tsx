import React from 'react';
import { addContractorService } from './addContractorService.model';
import { useUnit } from 'effector-react';
import { AddContractorModal } from './view/AddContractorModal';

const { inputs, outputs } = addContractorService;

export const AddContractorContainer = () => {
  const { handleAddcontractor, handleCloseModal, isModalOpen } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleAddcontractor: inputs.handleAddcontractor,
  });
  return (
    <>
      <AddContractorModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        handleAddcontractor={handleAddcontractor}
      />
    </>
  );
};
