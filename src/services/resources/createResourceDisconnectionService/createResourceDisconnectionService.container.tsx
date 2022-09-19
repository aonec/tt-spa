import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceDisconnectionFiltersService } from 'services/resources/resourceDisconnectionFiltersService';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';
import { createResourceDisconnectionService } from './createResourceDisconnectionService.model';
import { prepareAddressesForTreeSelect } from './createResourceDisconnectionService.utils';
import { CreateResourceDisconnectionModal } from './view/CreateResourceDisconnectionModal';
import { ExistingStreetWithHousingStocks } from './view/CreateResourceDisconnectionModal/CreateResourceDisconnectionModal.types';
import { chooseTypeOfResourceDisconnectionModalService } from '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';

import '../editResourceDisconnectionService/editResourceDisconnectionService.relations';
import '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.relations';

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
  const isInterHeatingSeason = useStore(
    chooseTypeOfResourceDisconnectionModalService.outputs.$isInterHeatingSeason
  );
  const isEdit = useStore(editResourceDisconnectionService.outputs.$isEdit);
  const resourceDisconnection = useStore(
    editResourceDisconnectionService.outputs.$resourceDisconnection
  );
  const isDisconnectionLoading = useStore(
    editResourceDisconnectionService.outputs.$isDisconectionLoading
  );

  const handleCloseModal = useEvent(inputs.closeModal);
  const handleEditResourceDisconnection = useEvent(
    editResourceDisconnectionService.inputs.editResourceDisconnection
  );
  const handleCreateResourceDisconnection = useEvent(
    inputs.createResourceDisconnection
  );
  const handleSelectCity = useEvent(inputs.selectCity);
  const handleSelectHeatingStation = useEvent(inputs.selectHeatingStation);
  const handleUpdateDocument = useEvent(
    editResourceDisconnectionService.inputs.updateDocument
  );

  const preparedAddressesFromHeatingStation = useMemo(
    () =>
      addressesFromHeatingStation?.reduce((acc, elem) => {
        const title = getHousingStockAddress(elem);
        if (title) {
          return [
            ...acc,
            {
              title,
              value: elem.id,
              key: elem.id,
            },
          ];
        }
        return acc;
      }, [] as ExistingStreetWithHousingStocks[]),
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
        isInterHeatingSeason={isInterHeatingSeason}
        isEdit={isEdit}
        isDisconnectionLoading={isDisconnectionLoading}
        resourceDisconnection={resourceDisconnection}
        handleEditResourceDisconnection={handleEditResourceDisconnection}
        handleUpdateDocument={handleUpdateDocument}
      />
    </>
  );
};
