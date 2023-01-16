import React from 'react';
import { addContractorService } from './addContractorService.model';
import { useEvent, useStore } from 'effector-react';
import { AddContractorModal } from './view/AddContractorModal';

const { inputs, outputs } = addContractorService;

export const AddContractorContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const handleAddcontractor = useEvent(inputs.handleAddcontractor);
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
