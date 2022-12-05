import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { createHeatingStationService } from './createHeatingStationService.model';
import { CreateNewHeatingStationModal } from './view/CreateNewHeatingStationModal';

const { inputs, outputs } = createHeatingStationService;

const handleCloseModal = useEvent(inputs.handleCloseModal);

const handleCreateHeatingStation = useEvent(inputs.handleCreateHeatingStation);

export const CreateHeatingStationContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  return (
    <>
      <CreateNewHeatingStationModal
        handleCreateHeatingStation={handleCreateHeatingStation}
        handleCloseModal={() => handleCloseModal()}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
