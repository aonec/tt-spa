import { useUnit } from 'effector-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { CreateHeatingStationContainer } from '../heatingStations/createHeatingStationService';
import { EditHeatingStationContainer } from '../heatingStations/editHeatingStationService';
import { createObjectService } from './createObjectService.model';
import { CreateObjectPage } from './view/CreateObjectPage';
import { EHouseCategory } from 'api/types';
import { houseManagementsService } from '../houseManagementsService';
import { CreateHouseManagementContainer } from '../houseManagementsService/houseManagementsService.container';

const { inputs, outputs, gates } = createObjectService;
const { HouseManagementsFetchGate, PageCloseGate, HeatingStationsFetchGate } =
  gates;

export const CreateObjectContainer = () => {
  const {
    closePreviewModal,
    createObjectData,
    existingCities,
    existingStreets,
    goBackStage,
    handlePostCreateObject,
    handleSubmitCreateObject,
    heatingStationCapture,
    heatingStations,
    houseManagements,
    isCreateLoading,
    isPreviewModalOpen,
    openCreateHeatingStationModal,
    openEditHeatingStationModal,
    openPreviewModal,
    stageNumber,
    handleOpenHouseManagementModal,
  } = useUnit({
    existingCities: addressSearchService.outputs.$existingCities,
    existingStreets: addressSearchService.outputs.$existingStreets,
    stageNumber: outputs.$stageNumber,
    isPreviewModalOpen: outputs.$isPreviewModalOpen,
    isCreateLoading: outputs.$isCreateLoading,
    houseManagements: outputs.$houseManagements,
    createObjectData: outputs.$createObjectData,
    heatingStations: outputs.$heatingStations,
    handleSubmitCreateObject: inputs.handleSubmitCreateObject,
    handlePostCreateObject: inputs.handlePostCreateObject,
    openPreviewModal: inputs.openPreviewModal,
    closePreviewModal: inputs.closePreviewModal,
    openCreateHeatingStationModal: inputs.handleHeatindStationModalOpen,
    openEditHeatingStationModal: inputs.openEditHeatingStationModal,
    heatingStationCapture: inputs.heatingStationCapture,
    goBackStage: inputs.goBackStage,
    handleOpenHouseManagementModal:
      houseManagementsService.inputs.handleOpenModal,
  });

  const navigate = useNavigate();
  const onPageCancel = () => navigate(-1);

  useEffect(() => {
    return inputs.handleCreateObjectSuccessDone.watch((data) => {
      const type = data.houseCategory;
      let buildingProfilePath = '';
      if (type === EHouseCategory.Living) {
        buildingProfilePath = 'livingProfile';
      } else {
        buildingProfilePath = 'nonResidentialProfile';
      }

      if (data?.id) {
        navigate(`/buildings/${buildingProfilePath}/${data.id}`);
      }
    }).unsubscribe;
  }, [navigate]);

  return (
    <>
      <PageCloseGate />
      <HouseManagementsFetchGate />
      <HeatingStationsFetchGate />
      <CreateHeatingStationContainer />
      <CreateHouseManagementContainer />
      <EditHeatingStationContainer />
      <CreateObjectPage
        existingCities={existingCities}
        existingStreets={existingStreets}
        createObjectData={createObjectData}
        stageNumber={stageNumber}
        houseManagements={houseManagements}
        goBackStage={() => goBackStage()}
        onPageCancel={onPageCancel}
        handleSubmitCreateObject={handleSubmitCreateObject}
        heatingStations={heatingStations}
        handlePostCreateObject={() => handlePostCreateObject()}
        isPreviewModalOpen={isPreviewModalOpen}
        openPreviewModal={() => openPreviewModal()}
        closePreviewModal={() => closePreviewModal()}
        openCreateHeatingStationModal={() => openCreateHeatingStationModal()}
        openEditHeatingStationModal={() => openEditHeatingStationModal()}
        heatingStationCapture={heatingStationCapture}
        isCreateLoading={isCreateLoading}
        handleOpenHouseManagementModal={handleOpenHouseManagementModal}
      />
    </>
  );
};
