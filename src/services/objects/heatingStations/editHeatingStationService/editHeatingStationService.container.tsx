import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { editHeatingStationService } from './editHeatingStationService.model';
import { EditHeatingStationModal } from './view/EditHeatingStationModal';

const { inputs, outputs } = editHeatingStationService;

export const EditHeatingStationContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const existingCities = useStore(outputs.$existingCities);
  const existingStreets = useStore(outputs.$existingStreets);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const handleEditHeatingStation = useEvent(inputs.handleEditHeatingStation);

  return (
    <>
      <EditHeatingStationModal
        handleEditHeatingStation={handleEditHeatingStation}
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        existingCities={existingCities}
        existingStreets={existingStreets}
      />
    </>
  );
};
