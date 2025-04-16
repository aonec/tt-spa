import React from 'react';
import { useUnit } from 'effector-react';
import { houseManagementsService } from './houseManagementsService.model';
import { CreateHouseManagementModal } from './CreateHouseManagementModal';

const { inputs, outputs } = houseManagementsService;

export const CreateHouseManagementContainer = () => {
  const { handleCloseModal, isModalOpen, handleCreateHouseManagement } =
    useUnit({
      isModalOpen: outputs.$isModalOpen,
      handleCloseModal: inputs.handleCloseModal,
      handleCreateHouseManagement: inputs.handleCreateHouseManagement,
    });

  return (
    <CreateHouseManagementModal
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleCreateHouseManagement={handleCreateHouseManagement}
    />
  );
};
