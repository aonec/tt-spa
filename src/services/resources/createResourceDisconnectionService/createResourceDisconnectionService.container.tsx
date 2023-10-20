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
import { preselectedBuildingQuery } from './createResourceDisconnectionService.api';

const { inputs, outputs, fx } = createResourceDisconnectionService;
const { gates } = resourceDisconnectionFiltersService;
const { ResourceDisconnectigFiltersGate } = gates;

const {
  gates: { ExistingCitiesGate },
} = addressSearchService;

export const CreateResourceDisconnectionContainer: FC<
  CreateDisconnectionContainerProps
> = ({
  handleCreateDisconnectionState,
  handleComplete,
  dateFrom,
  preselectedBuilding,
  defaultResource,
}) => {
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

  const { start: fetchPreseelcetedBuilding, data: building } = useUnit(
    preselectedBuildingQuery,
  );

  const defaultCity = building?.address?.mainAddress?.city;

  useEffect(() => {
    if (preselectedBuilding) {
      fetchPreseelcetedBuilding(preselectedBuilding);

      return preselectedBuildingQuery.reset;
    }
  }, [fetchPreseelcetedBuilding, preselectedBuilding]);

  useEffect(() => {
    if (handleComplete) {
      return fx.createResourceDisconnectionFx.doneData.watch(handleComplete)
        .unsubscribe;
    }
  }, [handleComplete]);

  const preparedExistingHousingStocks = useMemo(() => {
    const disabledBuildingIds = preselectedBuilding
      ? [preselectedBuilding]
      : [];

    if (typeOfAddress === EAddressDetails.All) {
      return prepareAddressesForTreeSelect(
        {
          items: existingBuildings,
          isTreeCheckable: true,
        },
        disabledBuildingIds,
      );
    }
    const housingStocks = buildingWithHeatingStations.length
      ? buildingWithHeatingStations
      : buildingWithHouseManagements;
    return prepareAddressesWithParentsForTreeSelect(
      housingStocks,
      disabledBuildingIds,
    );
  }, [
    preselectedBuilding,
    typeOfAddress,
    buildingWithHeatingStations,
    buildingWithHouseManagements,
    existingBuildings,
  ]);

  const preselectedBuildingData = existingBuildings.find((elem) =>
    elem.addresses?.find(
      (address) => address.buildingId === preselectedBuilding,
    ),
  );

  return (
    <>
      <ExistingCitiesGate />
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
        dateFrom={dateFrom}
        preselectedBuilding={preselectedBuilding}
        defaultResource={defaultResource}
        preselectedBuildingData={preselectedBuildingData}
        defaultCity={defaultCity}
      />
    </>
  );
};
