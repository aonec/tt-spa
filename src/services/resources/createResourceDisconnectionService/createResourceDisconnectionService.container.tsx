import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceDisconnectionFiltersService } from 'services/resources/resourceDisconnectionFiltersService';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { createResourceDisconnectionService } from './createResourceDisconnectionService.model';
import { prepareAddressesForTreeSelect } from './createResourceDisconnectionService.utils';
import { CreateResourceDisconnectionModal } from './view/CreateResourceDisconnectionModal';

const { inputs, outputs } = createResourceDisconnectionService;
const { gates } = resourceDisconnectionFiltersService;
const { ResourceDisconnectigFiltersGate } = gates;

export const CreateResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const cities = useStore(outputs.$cities);
  const resourceTypes = useStore(outputs.$resourceTypes);
  const disconnectingTypes = useStore(outputs.$disconnectingTypes);
  const heatingStations = useStore(outputs.$heatingStations);
  const selectedCity = useStore(outputs.$selectedCity);
  const addressesFromHeatingStation = useStore(
    outputs.$addressesFromHeatingStation
  );
  const existingHousingStocks = useStore(outputs.$existingHousingStocks);

  const handleCloseModal = useEvent(inputs.closeModal);
  const handleCreateResourceDisconnection = useEvent(
    inputs.createResourceDisconnection
  );
  const handleSelectCity = useEvent(inputs.selectCity);
  const handleSelectHeatingStation = useEvent(inputs.selectHeatingStation);

  const preparedAddressesFromHeatingStation = useMemo(
    () =>
      addressesFromHeatingStation?.map((elem) => ({
        title: getHousingStockAddress(elem)!,
        value: elem.id,
        key: elem.id,
      })),
    [addressesFromHeatingStation]
  );
  const preparedExistingHousingStocks = useMemo(
    () => prepareAddressesForTreeSelect(existingHousingStocks),
    [existingHousingStocks]
  );

  const treeData = addressesFromHeatingStation.length
    ? preparedAddressesFromHeatingStation
    : preparedExistingHousingStocks;

  return (
    <>
      <ResourceDisconnectigFiltersGate />
      <CreateResourceDisconnectionModal
        selectedCity={selectedCity}
        cities={cities}
        resourceTypes={resourceTypes}
        disconnectingTypes={disconnectingTypes}
        heatingStations={heatingStations}
        treeData={treeData}
        isOpen={isOpen}
        handleClose={() => handleCloseModal()}
        handleCreateResourceDisconnection={handleCreateResourceDisconnection}
        handleSelectCity={handleSelectCity}
        handleSelectHeatingStation={handleSelectHeatingStation}
      />
    </>
  );
};
