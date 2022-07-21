import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { createResourceDisconnectionService } from './createResourceDisconnectionService.model';
import { CreateResourceDisconnectionModal } from './view/CreateResourceDisconnectionModal';

const { inputs, outputs } = createResourceDisconnectionService;

export const CreateResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const cities = useStore(outputs.$existingCities);
  const heatingStations = useStore(outputs.$heatingStations);
  const selectedCity = useStore(outputs.$selectedCity);
  const addresses = useStore(outputs.$addresses);

  const handleCloseModal = useEvent(inputs.closeModal);
  const handleCreateResourceDisconnection = useEvent(
    inputs.createResourceDisconnection
  );
  const handleSelectCity = useEvent(inputs.selectCity);
  const handleSelectHeatingStation = useEvent(inputs.selectHeatingStation);

  return (
    <>
      <ExistingCitiesGate />
      <CreateResourceDisconnectionModal
        selectedCity={selectedCity}
        cities={cities}
        heatingStations={heatingStations}
        addresses={addresses}
        isOpen={isOpen}
        handleClose={() => handleCloseModal()}
        handleCreateResourceDisconnection={handleCreateResourceDisconnection}
        handleSelectCity={handleSelectCity}
        handleSelectHeatingStation={handleSelectHeatingStation}
      />
    </>
  );
};
