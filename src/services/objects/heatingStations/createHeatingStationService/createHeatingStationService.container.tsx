import { useUnit } from 'effector-react';
import React from 'react';
import { createHeatingStationService } from './createHeatingStationService.model';
import { CreateNewHeatingStationModal } from './view/CreateNewHeatingStationModal';

const { inputs, outputs } = createHeatingStationService;

export const CreateHeatingStationContainer = () => {
  const {
    existingCities,
    existingStreets,
    handleCloseModal,
    handleCreateHeatingStation,
    isModalOpen,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    existingCities: outputs.$existingCities,
    existingStreets: outputs.$existingStreets,
    handleCloseModal: inputs.handleCloseModal,
    handleCreateHeatingStation: inputs.handleCreateHeatingStation,
  });

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
