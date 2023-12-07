import { useUnit } from 'effector-react';
import React from 'react';
import { editHeatingStationService } from './editHeatingStationService.model';
import { EditHeatingStationModal } from './view/EditHeatingStationModal';

const { inputs, outputs } = editHeatingStationService;

export const EditHeatingStationContainer = () => {
  const {
    currentHeatingStation,
    existingCities,
    existingStreets,
    handleCloseModal,
    handleEditHeatingStation,
    isModalOpen,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    existingCities: outputs.$existingCities,
    existingStreets: outputs.$existingStreets,
    currentHeatingStation: outputs.$currentHeatingStation,
    handleCloseModal: inputs.handleCloseModal,
    handleEditHeatingStation: inputs.handleEditHeatingStation,
  });

  return (
    <>
      <EditHeatingStationModal
        handleEditHeatingStation={handleEditHeatingStation}
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        existingCities={existingCities}
        existingStreets={existingStreets}
        openedHeatingStationData={currentHeatingStation}
      />
    </>
  );
};
