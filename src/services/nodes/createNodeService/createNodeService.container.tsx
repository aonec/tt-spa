import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';
import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { createNodeService } from './createNodeService.model';
import { CreateNodePage } from './view/CreateNodePage';
import { CreateNodeServiceZoneContainer } from '../createNodeServiceZoneService';
import { CreateNodeConfirmationModal } from './view/CreateNodeConfirmationModal';
import { CreateCalculatorModalContainer } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/createCalculatorModalService';

const { inputs, outputs, gates } = createNodeService;
const { CreateNodeGate } = gates;

export const CreateNodeContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();
  const history = useHistory();

  const housingStock = useStore(outputs.$housingStock);
  const existingCities = useStore(outputs.$existingCities);
  const existingStreets = useStore(outputs.$existingStreets);
  const isLoadingHousingStock = useStore(outputs.$isLoadingHousingStock);
  const stepNumber = useStore(outputs.$stepNumber);
  const calculatorsList = useStore(outputs.$calculatorsList);
  const requestPayload = useStore(outputs.$requestPayload);
  const nodeServiceZones = useStore(outputs.$nodeServiceZones);
  const isConfirmationModalOpen = useStore(outputs.$isConfirmationModalOpen);
  const selectedCalculator = useStore(outputs.$selectedCalculator);
  const selectedServiceZone = useStore(outputs.$selectedServiceZone);
  const isCreatePipeNodeLoading = useStore(outputs.$isCreatePipeNodeLoading);
  const isValidationLoading = useStore(outputs.$isValidationLoading);
  const validationResult = useStore(outputs.$validationResult);

  const updateRequestPayload = useEvent(inputs.updateRequestPayload);
  const goPrevStep = useEvent(inputs.goPrevStep);
  const openCreateCalculatorModal = useEvent(inputs.openCreateCalculatorModal);
  const openCreateNodeServiceZoneModal = useEvent(
    inputs.openCreateNodeServiceZoneModal,
  );
  const validateNode = useEvent(inputs.validateNode);
  const closeConfiramtionModal = useEvent(inputs.closeConfiramtionModal);
  const handleSubmitForm = useEvent(inputs.handleSubmitForm);

  useEffect(() => {
    return inputs.handlePipeNodeCreated.watch((node) =>
      history.push(`/nodes/${node.id}`),
    );
  }, [history]);

  return (
    <>
      <CreateNodeGate housingStockId={Number(housingStockId)} />
      <ExistingCitiesGate />
      <CreateNodeServiceZoneContainer />
      <CreateCalculatorModalContainer />
      {housingStock && selectedServiceZone && (
        <CreateNodeConfirmationModal
          isOpen={isConfirmationModalOpen}
          handleClose={() => closeConfiramtionModal()}
          requestPayload={requestPayload}
          housingStock={housingStock}
          calculator={selectedCalculator}
          serviceZone={selectedServiceZone}
          handleSubmitForm={() => handleSubmitForm()}
          isLoading={isCreatePipeNodeLoading}
          validationResult={validationResult}
        />
      )}
      <CreateNodePage
        housingStock={housingStock}
        existingCities={existingCities}
        existingStreets={existingStreets}
        isLoadingHousingStock={isLoadingHousingStock}
        updateRequestPayload={updateRequestPayload}
        goPrevStep={() => goPrevStep()}
        stepNumber={stepNumber}
        calculatorsList={calculatorsList}
        openCreateCalculatorModal={() =>
          requestPayload.housingStockId &&
          openCreateCalculatorModal(requestPayload.housingStockId)
        }
        isDisabledAddress={Boolean(housingStockId)}
        isValidationLoading={isValidationLoading}
        requestPayload={requestPayload}
        nodeServiceZones={nodeServiceZones}
        openCreateNodeServiceZoneModal={() => openCreateNodeServiceZoneModal()}
        validateNode={() => validateNode()}
      />
    </>
  );
};
