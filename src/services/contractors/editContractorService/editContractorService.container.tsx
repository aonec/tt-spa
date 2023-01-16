import React from 'react';
import { EditContractorModal } from './view/EditContractorModal';
import { editContractorService } from './editContractorService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = editContractorService;

export const EditContractorContainer = () => {
  const isEditModalOpen = useStore(outputs.$isModalOpen);
  const contractorData = useStore(outputs.$contractorData);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const handleEditcontractor = useEvent(inputs.handleEditcontractor);
  return (
    <>
      <EditContractorModal
        isEditModalOpen={isEditModalOpen}
        contractorData={contractorData}
        handleCloseModal={() => handleCloseModal()}
        handleEditcontractor={handleEditcontractor}
      />
    </>
  );
};
