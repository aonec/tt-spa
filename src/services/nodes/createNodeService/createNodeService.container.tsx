import { ExistingCitiesGate } from '01/features/housingStocks/displayHousingStockCities/models';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { createNodeService } from './createNodeService.model';
import { CreateNodePage } from './view/CreateNodePage';

const { inputs, outputs, gates } = createNodeService;
const { CreateNodeGate, CreateCalculatorGate } = gates;

export const CreateNodeContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const housingStock = useStore(outputs.$housingStock);
  const existingCities = useStore(outputs.$existingCities);
  const existingStreets = useStore(outputs.$existingStreets);
  const isLoadingHousingStock = useStore(outputs.$isLoadingHousingStock);
  const stepNumber = useStore(outputs.$stepNumber);
  const calculatorsList = useStore(outputs.$calculatorsList);
  const requestPayload = useStore(outputs.$requestPayload);
  const nodeServiceZones = useStore(outputs.$nodeServiceZones);

  const updateRequestPayload = useEvent(inputs.updateRequestPayload);
  const goPrevStep = useEvent(inputs.goPrevStep);
  const openCreateCalculatorModal = useEvent(inputs.openCreateCalculatorModal);
  const openCreateNodeServiceZoneModal = useEvent(
    inputs.openCreateNodeServiceZoneModal
  );

  return (
    <>
      <CreateNodeGate housingStockId={Number(housingStockId)} />
      <ExistingCitiesGate />
      <CreateCalculatorGate housingStockId={requestPayload.housingStockId} />
      <CreateNodePage
        housingStock={housingStock}
        existingCities={existingCities}
        existingStreets={existingStreets}
        isLoadingHousingStock={isLoadingHousingStock}
        updateRequestPayload={updateRequestPayload}
        goPrevStep={() => goPrevStep()}
        stepNumber={stepNumber}
        calculatorsList={calculatorsList}
        openCreateCalculatorModal={() => openCreateCalculatorModal()}
        isDisabledAddress={Boolean(housingStockId)}
        requestPayload={requestPayload}
        nodeServiceZones={nodeServiceZones}
        openCreateNodeServiceZoneModal={() => openCreateNodeServiceZoneModal()}
      />
    </>
  );
};
