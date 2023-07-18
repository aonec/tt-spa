import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { createNodeService } from './createNodeService.model';
import { CreateNodePage } from './view/CreateNodePage';
import { CreateNodeServiceZoneContainer } from '../createNodeServiceZoneService';
import { CreateNodeConfirmationModal } from './view/CreateNodeConfirmationModal';
import { CreateCalculatorModalContainer } from 'services/calculators/createCalculatorModalService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { EHouseCategory } from 'myApi';

const { inputs, outputs, gates } = createNodeService;
const { CreateNodeGate } = gates;
const { ExistingCitiesGate } = addressSearchService.gates;

export const CreateNodeContainer = () => {
  const { buildingId, houseCategory } = useParams<{
    buildingId: string;
    houseCategory?: EHouseCategory;
  }>();

  const history = useHistory();

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
  });

  useEffect(() => {
    return inputs.handlePipeNodeCreated.watch((node) =>
      history.push(`/nodes/${node.id}`),
    );
  }, [history]);

  return (
    <>
      <CreateNodeGate
        buildingId={Number(buildingId)}
        houseCategory={houseCategory}
      />
      <ExistingCitiesGate />
      <CreateNodeServiceZoneContainer />
      <CreateCalculatorModalContainer />
      {building && selectedServiceZone && (
        <CreateNodeConfirmationModal
          isOpen={isConfirmationModalOpen}
          handleClose={() => closeConfiramtionModal()}
          requestPayload={requestPayload}
          building={building}
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
