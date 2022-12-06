import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { createHeatingStationService } from './createHeatingStationService.model';
import { CreateNewHeatingStationModal } from './view/CreateNewHeatingStationModal';

const { inputs, outputs } = createHeatingStationService;

export const CreateHeatingStationContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const existingCities = useStore(outputs.$existingCities);
  const existingStreets = useStore(outputs.$existingStreets);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const handleCreateHeatingStation = useEvent(
    inputs.handleCreateHeatingStation
  );

  return (
    <>
      <CreateNewHeatingStationModal
        handleCreateHeatingStation={handleCreateHeatingStation}
        handleCloseModal={() => handleCloseModal()}
        isModalOpen={isModalOpen}
        existingCities={existingCities}
        existingStreets={existingStreets}
      />
    </>
  );
};
