import React from 'react';
import { EditContractorModal } from './view/EditContractorModal';
import { editContractorService } from './editContractorService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = editContractorService;

export const EditContractorContainer = () => {
  const {
    contractorData,
    handleCloseModal,
    handleEditcontractor,
    isEditModalOpen,
  } = useUnit({
    isEditModalOpen: outputs.$isModalOpen,
    contractorData: outputs.$contractorData,
    handleCloseModal: inputs.handleCloseModal,
    handleEditcontractor: inputs.handleEditcontractor,
  });

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
