import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { createHeatingStationService } from './createHeatingStationService.model';
import { CreateNewHeatingStationModal } from './view/CreateNewHeatingStationModal';

const { inputs, outputs } = createHeatingStationService;

const setModalOpen = useEvent(inputs.setModalOpen);
const handleCreateHeatingStation = useEvent(inputs.handleCreateHeatingStation);

const isModalOpen = useStore(outputs.$isModalOpen);

export const CreateHeatingStationContainer = () => {
  return (
    <>
      <CreateNewHeatingStationModal
        handleCreateHeatingStation={handleCreateHeatingStation}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};
