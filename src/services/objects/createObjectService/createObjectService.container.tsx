import { useEvent, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { CreateHeatingStationContainer } from '../heatingStations/createHeatingStationService';
import { EditHeatingStationContainer } from '../heatingStations/editHeatingStationService';
import { createObjectService } from './createObjectService.model';
import { CreateObjectPage } from './view/CreateObjectPage';
import { EHouseCategory } from 'api/types';

const { inputs, outputs, gates } = createObjectService;
const { HouseManagementsFetchGate, PageCloseGate, HeatingStationsFetchGate } =
  gates;

export const CreateObjectContainer = () => {
  const existingCities = useStore(addressSearchService.outputs.$existingCities);
  const existingStreets = useStore(
    addressSearchService.outputs.$existingStreets,
  );

  const stageNumber = useStore(outputs.$stageNumber);
  const isPreviewModalOpen = useStore(outputs.$isPreviewModalOpen);
  const isCreateLoading = useStore(outputs.$isCreateLoading);

  const houseManagements = useStore(outputs.$houseManagements);
  const createObjectData = useStore(outputs.$createObjectData);
  const heatingStations = useStore(outputs.$heatingStations);

  const handleSubmitCreateObject = useEvent(inputs.handleSubmitCreateObject);
  const handlePostCreateObject = useEvent(inputs.handlePostCreateObject);

  const openPreviewModal = useEvent(inputs.openPreviewModal);
  const closePreviewModal = useEvent(inputs.closePreviewModal);

  const openCreateHeatingStationModal = useEvent(
    inputs.handleHeatindStationModalOpen,
  );

  const openEditHeatingStationModal = useEvent(
    inputs.openEditHeatingStationModal,
  );

  const heatingStationCapture = useEvent(inputs.heatingStationCapture);

  const goBackStage = useEvent(inputs.goBackStage);

  const history =  useNavigate();
  const onPageCancel = () => history(-1);

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
         history(`/buildings/${buildingProfilePath}/${data.id}`);
      }
    }).unsubscribe;
  }, [history]);

  return (
    <>
      <PageCloseGate />
      <HouseManagementsFetchGate />
      <HeatingStationsFetchGate />
      <CreateHeatingStationContainer />
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
      />
    </>
  );
};
