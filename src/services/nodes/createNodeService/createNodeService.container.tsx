import React, { useEffect, useMemo } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { createNodeService } from './createNodeService.model';
import { CreateNodePage } from './view/CreateNodePage';
import { CreateNodeServiceZoneContainer } from '../createNodeServiceZoneService';
import { CreateNodeConfirmationModal } from './view/CreateNodeConfirmationModal';
import { CreateCalculatorModalContainer } from 'services/calculators/createCalculatorModalService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { EHouseCategory } from 'api/types';
import { mountAddressService } from './view/CreateNodePage/MountAddress/MountAddress.models';

const { inputs, outputs, gates } = createNodeService;
const { CreateNodeGate } = gates;
const { ExistingCitiesGate } = addressSearchService.gates;

export const CreateNodeContainer = () => {
  const { buildingId, houseCategory } = useParams<{
    buildingId: string;
    houseCategory?: string;
  }>();

  const preparedHouseCategory = useMemo(() => {
    if (houseCategory === 'livingProfile') {
      return EHouseCategory.Living;
    }
    if (houseCategory === 'nonResidential') {
      return EHouseCategory.NonResidential;
    }
    return null;
  }, [houseCategory]);

  const history =  useNavigate();

  const {
    building,
    calculatorsList,
    closeConfiramtionModal,
    existingCities,
    existingStreets,
    goPrevStep,
    handleSubmitForm,
    isBuildingLoading,
    isConfirmationModalOpen,
    isCreatePipeNodeLoading,
    isValidationLoading,
    nodeServiceZones,
    openCreateCalculatorModal,
    openCreateNodeServiceZoneModal,
    requestPayload,
    selectedCalculator,
    selectedServiceZone,
    stepNumber,
    updateRequestPayload,
    validateNode,
    validationResult,
    mountBuilding,
  } = useUnit({
    isBuildingLoading: outputs.$isLoadingBuilding,
    building: outputs.$building,
    existingCities: outputs.$existingCities,
    existingStreets: outputs.$existingStreets,
    stepNumber: outputs.$stepNumber,
    calculatorsList: outputs.$calculatorsList,
    requestPayload: outputs.$requestPayload,
    nodeServiceZones: outputs.$nodeServiceZones,
    isConfirmationModalOpen: outputs.$isConfirmationModalOpen,
    selectedCalculator: outputs.$selectedCalculator,
    selectedServiceZone: outputs.$selectedServiceZone,
    isCreatePipeNodeLoading: outputs.$isCreatePipeNodeLoading,
    isValidationLoading: outputs.$isValidationLoading,
    validationResult: outputs.$validationResult,
    updateRequestPayload: inputs.updateRequestPayload,
    goPrevStep: inputs.goPrevStep,
    openCreateCalculatorModal: inputs.openCreateCalculatorModal,
    openCreateNodeServiceZoneModal: inputs.openCreateNodeServiceZoneModal,
    validateNode: inputs.validateNode,
    closeConfiramtionModal: inputs.closeConfiramtionModal,
    handleSubmitForm: inputs.handleSubmitForm,
    mountBuilding: mountAddressService.outputs.$buildingListItem,
  });

  useEffect(() => {
    return inputs.handlePipeNodeCreated.watch((node) =>
       history(`/nodes/${node.id}`),
    );
  }, [history]);

  const preparedBuildingData = mountBuilding || building; //первый берет данные из сторы (случай входа на страницу из "приборы"), второй из запроса по данным из парамс

  return (
    <>
      <CreateNodeGate
        buildingId={Number(buildingId)}
        houseCategory={preparedHouseCategory}
      />
      <ExistingCitiesGate />
      <CreateNodeServiceZoneContainer />
      <CreateCalculatorModalContainer />
      {preparedBuildingData && selectedServiceZone && (
        <CreateNodeConfirmationModal
          isOpen={isConfirmationModalOpen}
          handleClose={() => closeConfiramtionModal()}
          requestPayload={requestPayload}
          building={preparedBuildingData}
          calculator={selectedCalculator}
          serviceZone={selectedServiceZone}
          handleSubmitForm={() => handleSubmitForm()}
          isLoading={isCreatePipeNodeLoading}
          validationResult={validationResult}
        />
      )}
      <CreateNodePage
        building={building}
        existingCities={existingCities}
        existingStreets={existingStreets}
        isBuildingLoading={isBuildingLoading}
        updateRequestPayload={updateRequestPayload}
        goPrevStep={() => goPrevStep()}
        stepNumber={stepNumber}
        calculatorsList={calculatorsList}
        openCreateCalculatorModal={() =>
          requestPayload.buildingId &&
          openCreateCalculatorModal(requestPayload.buildingId)
        }
        isDisabledAddress={Boolean(buildingId)}
        isValidationLoading={isValidationLoading}
        requestPayload={requestPayload}
        nodeServiceZones={nodeServiceZones}
        openCreateNodeServiceZoneModal={() => openCreateNodeServiceZoneModal()}
        validateNode={() => validateNode()}
      />
    </>
  );
};
