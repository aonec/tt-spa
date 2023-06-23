import { useUnit } from 'effector-react';
import React from 'react';
import { createIndividualSealControllerMutation } from './createControllerService.api';
import { CreateControllerModal } from './CreateControllerModal';
import { createControllerService } from './createControllerService.models';

const { inputs, outputs } = createControllerService;

export const CreateControllerContainer = () => {
  const { start: handleCreateIndividualSeal, pending: isLoading } = useUnit(
    createIndividualSealControllerMutation,
  );

  const closeModal = useUnit(inputs.closeCreateControllerModal);

  const isModalOpen = useUnit(outputs.$isModalOpen);

  return (
    <CreateControllerModal
      handleCreateIndividualSeal={handleCreateIndividualSeal}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    />
  );
};
