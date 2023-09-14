import { useUnit } from 'effector-react';
import React, { FC, useEffect, useMemo } from 'react';
import { resourceDisconnectionFiltersService } from 'services/resources/resourceDisconnectionFiltersService';
import { createResourceDisconnectionService } from './createResourceDisconnectionService.model';
import { CreateResourceDisconnectionModal } from './view/CreateResourceDisconnectionModal';
import { chooseTypeOfResourceDisconnectionModalService } from '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.model';

import '../editResourceDisconnectionService/editResourceDisconnectionService.relations';
import '../chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.relations';
import { editResourceDisconnectionService } from '../editResourceDisconnectionService';
import {
  CreateDisconnectionContainerProps,
  EAddressDetails,
} from './createResourceDisconnectionService.types';
import {
  prepareAddressesForTreeSelect,
  prepareAddressesWithParentsForTreeSelect,
} from 'ui-kit/shared/AddressTreeSelect/AddressTreeSelect.utils';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const { inputs, outputs, fx } = createResourceDisconnectionService;
const { gates } = resourceDisconnectionFiltersService;
const { ResourceDisconnectigFiltersGate } = gates;

export const CreateResourceDisconnectionContainer: FC<
  CreateDisconnectionContainerProps
> = ({ handleCreateDisconnectionState, handleComplete }) => {
  const {
    isOpen,
    resourceTypes,
    disconnectingTypes,
    typeOfAddress,
    existingBuildings,
    buildingWithHeatingStations,
    buildingWithHouseManagements,
    isHousingStocksLoading,
    isEdit,
    selectedCity,
    isInterHeatingSeason,
    resourceDisconnection,
    isDisconnectionLoading,
    existingCities,
    selectCity,
    setTypeOfAddress,
    handleCloseModal,
    handleCreateResourceDisconnection,
    handleEditResourceDisconnection,
    handleUpdateDocument,
    selectedBuilding,
  } = useUnit({
    isOpen: outputs.$isModalOpen,
    resourceTypes: outputs.$resourceTypes,
    disconnectingTypes: outputs.$disconnectingTypes,
    typeOfAddress: outputs.$typeOfAddress,
    existingBuildings: outputs.$existingBuildings,
    buildingWithHeatingStations: outputs.$buildingWithHeatingStations,
    buildingWithHouseManagements: outputs.$buildingWithHouseManagements,
    isHousingStocksLoading: outputs.$isHousingStocksLoading,
    selectedCity: outputs.$selectedCity,
    isInterHeatingSeason:
      chooseTypeOfResourceDisconnectionModalService.outputs
        .$isInterHeatingSeason,
    isEdit: editResourceDisconnectionService.outputs.$isEdit,
    resourceDisconnection:
      editResourceDisconnectionService.outputs.$resourceDisconnection,
    isDisconnectionLoading:
      editResourceDisconnectionService.outputs.$isDisconectionLoading,
    existingCities: addressSearchService.outputs.$existingCities,
    selectCity: inputs.selectCity,
    setTypeOfAddress: inputs.setTypeOfAddress,
    handleCloseModal: inputs.closeModal,
    handleCreateResourceDisconnection: inputs.createResourceDisconnection,
    handleEditResourceDisconnection:
      editResourceDisconnectionService.inputs.editResourceDisconnection,
    handleUpdateDocument:
      editResourceDisconnectionService.inputs.updateDocument,
    selectedBuilding: outputs.$selectedBuilding,
  });

  useEffect(() => {
    if (handleComplete) {
      return fx.createResourceDisconnectionFx.doneData.watch(handleComplete)
        .unsubscribe;
    }
  }, [handleComplete]);

  const preparedExistingHousingStocks = useMemo(() => {
    if (typeOfAddress === EAddressDetails.All) {
      return prepareAddressesForTreeSelect({ items: existingBuildings });
    }
    const housingStocks = buildingWithHeatingStations.length
      ? buildingWithHeatingStations
      : buildingWithHouseManagements;
    return prepareAddressesWithParentsForTreeSelect(housingStocks);
  }, [
    existingBuildings,
    buildingWithHeatingStations,
    buildingWithHouseManagements,
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
        selectedBuilding={selectedBuilding}
        handleCreateDisconnectionState={handleCreateDisconnectionState}
      />
    </>
  );
};
