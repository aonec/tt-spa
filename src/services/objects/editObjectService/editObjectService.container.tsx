import React, { useEffect, useMemo } from 'react';
import { EditObjectPage } from './view/EditObjectPage';
import { useNavigate, useParams } from 'react-router-dom';
import { editObjectService } from './editObjectService.model';
import { useUnit } from 'effector-react';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { createObjectService } from '../createObjectService';
import { EHouseCategory } from 'api/types';
import { houseManagementsService } from '../houseManagementsService';
import { updateHouseManagementService } from '../updateHouseManagement/updateHouseManagementService.models';
import { CreateHouseManagementContainer } from '../houseManagementsService/houseManagementsService.container';
import { UpdateHouseManagementContainer } from '../updateHouseManagement';

const { inputs, outputs, gates } = editObjectService;
const { ObjectIdGate } = gates;

const {
  gates: { HeatingStationsFetchGate, HouseManagementsFetchGate },
} = createObjectService;

export const EditObjectContainer = () => {
  const { buildingId, houseCategory } = useParams<{
    buildingId: string;
    houseCategory: string;
  }>();
  const navigate = useNavigate();

  const preparedHouseCategory = useMemo(() => {
    if (houseCategory === 'livingProfile') {
      return EHouseCategory.Living;
    }
    if (houseCategory === 'nonResidentialProfile') {
      return EHouseCategory.NonResidential;
    }
    return null;
  }, [houseCategory]);

  const buildingIdNumber = Number(buildingId);

  const {
    existingCities,
    existingStreets,
    handleCreateHousingStockAddress,
    handleDeleteHousingStockAddress,
    handleRefetchHousingStock,
    handleUpdateHousingStock,
    handleUpdateHousingStockAddress,
    heatingStationCapture,
    heatingStations,
    houseManagements,
    housingStock,
    isCreateLoading,
    isDeleteLoading,
    isHeatingStationsLoading,
    isHouseManagementsLoading,
    isUpdateLoading,
    nonResidentialBuilding,
    onPageCancel,
    openCreateHeatingStationModal,
    openEditHeatingStationModal,
    handleOpenHouseManagementModal,
    handleOpenModal,
  } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
    housingStock: outputs.$housingStock,
    nonResidentialBuilding: outputs.$nonResidentialBuilding,
    houseManagements: outputs.$houseManagements,
    heatingStations: outputs.$heatingStations,
    isHeatingStationsLoading: outputs.$isHeatingStationsLoading,
    isDeleteLoading: outputs.$isDeleteLoading,
    isUpdateLoading: outputs.$isUpdateLoading,
    isCreateLoading: outputs.$isCreateLoading,
    isHouseManagementsLoading: outputs.$isHouseManagementsLoading,
    existingStreets: addressSearchService.outputs.$existingStreets,
    openCreateHeatingStationModal: inputs.openCreateHeatingStationModal,
    openEditHeatingStationModal: inputs.openEditHeatingStationModal,
    heatingStationCapture: inputs.heatingStationCapture,
    onPageCancel: inputs.onPageCancel,
    handleUpdateHousingStock: inputs.handleUpdateHousingStock,
    handleCreateHousingStockAddress: inputs.handleCreateHousingStockAddress,
    handleUpdateHousingStockAddress: inputs.handleUpdateHousingStockAddress,
    handleDeleteHousingStockAddress: inputs.handleDeleteHousingStockAddress,
    handleRefetchHousingStock: inputs.handleRefetchBuilding,
    handleOpenHouseManagementModal:
      houseManagementsService.inputs.handleOpenModal,
    handleOpenModal: updateHouseManagementService.inputs.handleOpenModal,
  });

  useEffect(() => {
    return inputs.onPageCancel.watch(() => navigate(-1)).unsubscribe;
  }, [navigate]);

  return (
    <>
      <ObjectIdGate
        buildingId={buildingIdNumber}
        houseCategory={preparedHouseCategory}
      />
      <HouseManagementsFetchGate />
      <HeatingStationsFetchGate />

      <CreateHouseManagementContainer />
      <UpdateHouseManagementContainer />

      {(housingStock || nonResidentialBuilding) && (
        <EditObjectPage
          housingStock={housingStock}
          nonResidentialBuilding={nonResidentialBuilding}
          existingCities={existingCities}
          existingStreets={existingStreets}
          houseManagements={houseManagements}
          openCreateHeatingStationModal={() => openCreateHeatingStationModal()}
          openEditHeatingStationModal={() => openEditHeatingStationModal()}
          heatingStations={heatingStations}
          heatingStationCapture={heatingStationCapture}
          onPageCancel={onPageCancel}
          handleUpdateHousingStock={handleUpdateHousingStock}
          isHouseManagementsLoading={isHouseManagementsLoading}
          isHeatingStationsLoading={isHeatingStationsLoading}
          handleCreateHousingStockAddress={handleCreateHousingStockAddress}
          handleUpdateHousingStockAddress={handleUpdateHousingStockAddress}
          handleDeleteHousingStockAddress={handleDeleteHousingStockAddress}
          isDeleteLoading={isDeleteLoading}
          isCreateLoading={isCreateLoading}
          isUpdateLoading={isUpdateLoading}
          handleRefetchHousingStock={handleRefetchHousingStock}
          houseCategory={preparedHouseCategory}
          handleOpenHouseManagementModal={handleOpenHouseManagementModal}
          handleOpenEditHouseManagementModal={handleOpenModal}
        />
      )}
    </>
  );
};
