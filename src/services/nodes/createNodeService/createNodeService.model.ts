import { createNodeServiceZoneService } from './../createNodeServiceZoneService/createNodeServiceZoneService.model';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  EPipeNodeValidationMessageStringDictionaryItem,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  PipeNodeResponse,
  PipeNodeValidationResultResponse,
} from 'api/types';
import {
  fetchValidateNode,
  getCalculatorsList,
  getHousingStock,
  getNodeServiceZones,
  postPipeNode,
} from './createNodeService.api';
import { CreateNodeFormPayload } from './createNodeService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { createCalculatorModalService } from 'services/calculators/createCalculatorModalService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';

const domain = createDomain('createNodeService');

const createPipeNodeFx = domain.createEffect<
  CreatePipeNodeRequest,
  PipeNodeResponse,
  EffectFailDataAxiosError
>(postPipeNode);

const fetchHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  getHousingStock,
);

const handleSubmitForm = domain.createEvent();

const fetchCalculatorsListFx = domain.createEffect<
  number,
  CalculatorIntoHousingStockResponse[] | null
>(getCalculatorsList);

const fetchNodeServiceZonesFx = domain.createEffect<
  void,
  NodeServiceZoneListResponse | null
>(getNodeServiceZones);

const CreateNodeGate = createGate<{ buildingId: number }>();

const updateRequestPayload = domain.createEvent<CreateNodeFormPayload>();

const goNextStep = domain.createEvent();
const goPrevStep = domain.createEvent();

const openConfiramtionModal = domain.createEvent();
const closeConfiramtionModal = domain.createEvent();

const validateNode = domain.createEvent();
const validateNodeFx = domain.createEffect<
  CreatePipeNodeRequest,
  PipeNodeValidationResultResponse
>(fetchValidateNode);
const $validationResult = domain
  .createStore<EPipeNodeValidationMessageStringDictionaryItem[]>([])
  .on(validateNodeFx.doneData, (_, result) => [
    ...(result?.errors || []),
    ...(result?.warnings || []),
  ])
  .reset(closeConfiramtionModal);

const $stepNumber = domain
  .createStore(0)
  .on(goNextStep, (step) => step + 1)
  .on(goPrevStep, (step) => step - 1)
  .reset(CreateNodeGate.close);

const $requestPayload = domain
  .createStore<CreateNodeFormPayload>({})
  .on(updateRequestPayload, (prev, data) => ({ ...prev, ...data }))
  .reset(CreateNodeGate.close);

const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(fetchHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(CreateNodeGate.close);

const $calculatorsList = domain
  .createStore<CalculatorIntoHousingStockResponse[] | null>(null)
  .on(fetchCalculatorsListFx.doneData, (_, calculators) => calculators)
  .on(
    createCalculatorModalService.inputs.calculatorCreated,
    (prev, newCalculator) => [
      ...(prev || []),
      {
        id: newCalculator.id,
        serialNumber: newCalculator.serialNumber,
        model: newCalculator.model,
        calculatorInfoId: null,
      },
    ],
  )
  .reset(CreateNodeGate.close);

const $isConfirmationModalOpen = domain
  .createStore(false)
  .on(openConfiramtionModal, () => true)
  .reset(closeConfiramtionModal);

const $nodeServiceZones = domain
  .createStore<NodeServiceZoneListResponse | null>(null)
  .on(fetchNodeServiceZonesFx.doneData, (_, zones) => zones)
  .reset(CreateNodeGate.close);

guard({
  clock: CreateNodeGate.open.map(({ buildingId }) => buildingId),
  filter: Boolean,
  target: fetchHousingStockFx,
});

guard({
  source: $requestPayload.map(({ buildingId }) => buildingId),
  clock: guard({
    source: CreateNodeGate.state,
    clock: $requestPayload.map(({ buildingId }) => buildingId),
    filter: ({ buildingId }) => !buildingId,
  }),
  filter: Boolean,
  target: fetchHousingStockFx,
});

guard({
  source: $stepNumber,
  clock: updateRequestPayload,
  filter: (stepNumber) => stepNumber < 3,
  target: goNextStep,
});

guard({
  source: $requestPayload.map(({ buildingId }) => buildingId || null),
  clock: $requestPayload,
  filter: (id): id is number => Boolean(id),
  target: fetchCalculatorsListFx,
});

forward({
  from: [
    CreateNodeGate.open,
    createNodeServiceZoneService.inputs.handleServiceZoneCreated,
  ],
  to: fetchNodeServiceZonesFx,
});

sample({
  source: $requestPayload,
  clock: handleSubmitForm,
  target: createPipeNodeFx,
});

sample({
  source: $requestPayload,
  clock: validateNode,
  target: validateNodeFx,
});

forward({
  from: validateNodeFx.doneData,
  to: openConfiramtionModal,
});

const $selectedCalculator = combine(
  $requestPayload,
  $calculatorsList,
  ({ calculatorId }, calculatorsList) =>
    calculatorsList?.find((calculator) => calculator.id === calculatorId) ||
    null,
);

const $selectedServiceZone = combine(
  $requestPayload,
  $nodeServiceZones,
  ({ nodeServiceZoneId }, serviceZones) =>
    serviceZones?.nodeServiceZones?.find(
      (serviceZone) => serviceZone.id === nodeServiceZoneId,
    ) || null,
);

const $isLoadingHousingStock = fetchHousingStockFx.pending;
const $isCreatePipeNodeLoading = createPipeNodeFx.pending;
const $isValidationLoading = validateNodeFx.pending;

const handlePipeNodeCreated = createPipeNodeFx.doneData;

forward({
  from: handlePipeNodeCreated,
  to: closeConfiramtionModal,
});

createPipeNodeFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

createPipeNodeFx.doneData.watch(() => message.success('Узел успешно создан!'));

export const createNodeService = {
  inputs: {
    goPrevStep,
    updateRequestPayload,
    openCreateCalculatorModal: createCalculatorModalService.inputs.openModal,
    openCreateNodeServiceZoneModal:
      createNodeServiceZoneService.inputs.openCreateNodeServiceZoneModal,
    openConfiramtionModal,
    closeConfiramtionModal,
    handleSubmitForm,
    handlePipeNodeCreated,
    validateNode,
  },
  outputs: {
    $housingStock,
    $existingCities: addressSearchService.outputs.$existingCities,
    $existingStreets: addressSearchService.outputs.$existingStreets,
    $isLoadingHousingStock,
    $stepNumber,
    $calculatorsList,
    $requestPayload,
    $nodeServiceZones,
    $isConfirmationModalOpen,
    $selectedCalculator,
    $selectedServiceZone,
    $isCreatePipeNodeLoading,
    $validationResult,
    $isValidationLoading,
  },
  gates: {
    CreateNodeGate,
  },
};
