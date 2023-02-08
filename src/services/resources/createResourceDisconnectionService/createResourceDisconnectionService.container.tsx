import { useEvent, useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { resourceDisconnectionFiltersService } from 'services/resources/resourceDisconnectionFiltersService';
import { createResourceDisconnectionService } from './createResourceDisconnectionService.model';
import {
  prepareAddressesForTreeSelect,
  prepareAddressesWithParentsForTreeSelect,
} from './createResourceDisconnectionService.utils';
import { CreateResourceDisconnectionModal } from './view/CreateResourceDisconnectionModal';
import { chooseTypeOfResourceDisconnectionModalService } from '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';

import '../editResourceDisconnectionService/editResourceDisconnectionService.relations';
import '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.relations';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';
import { EAddressDetails } from './createResourceDisconnectionService.types';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';

const { inputs, outputs } = createResourceDisconnectionService;
const { gates } = resourceDisconnectionFiltersService;
const { ResourceDisconnectigFiltersGate } = gates;

export const CreateResourceDisconnectionContainer = () => {
  const isOpen = useStore(outputs.$isModalOpen);
  const resourceTypes = useStore(outputs.$resourceTypes);
  const disconnectingTypes = useStore(outputs.$disconnectingTypes);
  const typeOfAddress = useStore(outputs.$typeOfAddress);
  const existingHousingStocks = useStore(outputs.$existingHousingStocks);
  const housingStockWithHeatingStations = useStore(
    outputs.$housingStockWithHeatingStations,
  );
  const housingStockWithHouseManagements = useStore(
    outputs.$housingStockWithHouseManagements,
  );
  const isHousingStocksLoading = useStore(outputs.$isHousingStocksLoading);
  const selectedCity = useStore(outputs.$selectedCity);

  const isInterHeatingSeason = useStore(
    chooseTypeOfResourceDisconnectionModalService.outputs.$isInterHeatingSeason,
  );
  const isEdit = useStore(editResourceDisconnectionService.outputs.$isEdit);
  const resourceDisconnection = useStore(
    editResourceDisconnectionService.outputs.$resourceDisconnection,
  );
  const isDisconnectionLoading = useStore(
    editResourceDisconnectionService.outputs.$isDisconectionLoading,
  );
  const existingCities = useStore($existingCities);

  const selectCity = useEvent(inputs.selectCity);
  const setTypeOfAddress = useEvent(inputs.setTypeOfAddress);
  const handleCloseModal = useEvent(inputs.closeModal);
  const handleCreateResourceDisconnection = useEvent(
    inputs.createResourceDisconnection,
  );
  const handleEditResourceDisconnection = useEvent(
    editResourceDisconnectionService.inputs.editResourceDisconnection,
  );
  const handleUpdateDocument = useEvent(
    editResourceDisconnectionService.inputs.updateDocument,
  );

  const preparedExistingHousingStocks = useMemo(() => {
    if (typeOfAddress === EAddressDetails.All) {
      return prepareAddressesForTreeSelect({ items: existingHousingStocks });
    }
    const housingStocks = housingStockWithHeatingStations.length
      ? housingStockWithHeatingStations
      : housingStockWithHouseManagements;
    return prepareAddressesWithParentsForTreeSelect(housingStocks);
  }, [
    existingHousingStocks,
    housingStockWithHeatingStations,
    housingStockWithHouseManagements,
    typeOfAddress,
  ]);

  return (
    <>
      <ResourceDisconnectigFiltersGate />
      <CreateResourceDisconnectionModal
        resourceTypes={resourceTypes}
        treeData={preparedExistingHousingStocks}
        resourceDisconnection={resourceDisconnection}
        disconnectingTypes={disconnectingTypes}
        handleClose={() => handleCloseModal()}
        handleCreateResourceDisconnection={handleCreateResourceDisconnection}
        handleEditResourceDisconnection={handleEditResourceDisconnection}
        handleUpdateDocument={handleUpdateDocument}
        setTypeOfAddress={setTypeOfAddress}
        isOpen={isOpen}
        typeOfAddress={typeOfAddress}
        isInterHeatingSeason={isInterHeatingSeason}
        isEdit={isEdit}
        isDisconnectionLoading={isDisconnectionLoading}
        isHousingStocksLoading={isHousingStocksLoading}
        existingCities={existingCities || []}
        selectCity={selectCity}
        selectedCity={selectedCity}
      />
    </>
  );
};
