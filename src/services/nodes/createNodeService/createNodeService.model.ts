import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { message } from 'antd';
import { createGate } from 'effector-react';
import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  EHouseCategory,
  EPipeNodeValidationMessageStringDictionaryItem,
  HousingStockResponse,
  NodeServiceZoneListResponse,
  NonResidentialBuildingResponse,
  PipeNodeResponse,
  PipeNodeValidationResultResponse,
} from 'api/types';
import {
  fetchValidateNode,
  getBuilding,
  getCalculatorsList,
  getNodeServiceZones,
  postPipeNode,
} from './createNodeService.api';
import {
  CreateNodeFormPayload,
  GetBuildingPayload,
} from './createNodeService.types';
import { EffectFailDataAxiosError } from 'types';
import { createCalculatorModalService } from 'services/calculators/createCalculatorModalService';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { createNodeServiceZoneService } from '../createNodeServiceZoneService';

const createPipeNodeFx = createEffect<
  CreatePipeNodeRequest,
  PipeNodeResponse,
  EffectFailDataAxiosError
>(postPipeNode);

const fetchBuildingFx = createEffect<
  GetBuildingPayload,
  HousingStockResponse | NonResidentialBuildingResponse
>(getBuilding);

const handleSubmitForm = createEvent();

const fetchCalculatorsListFx = createEffect<
  number,
  CalculatorIntoHousingStockResponse[] | null
>(getCalculatorsList);

const fetchNodeServiceZonesFx = createEffect<
  void,
  NodeServiceZoneListResponse | null
>(getNodeServiceZones);

const CreateNodeGate = createGate<{
  buildingId: number;
  houseCategory: EHouseCategory | null;
}>();

const updateRequestPayload = createEvent<CreateNodeFormPayload>();

const goNextStep = createEvent();
const goPrevStep = createEvent();

const openConfiramtionModal = createEvent();
const closeConfiramtionModal = createEvent();

const validateNode = createEvent();
const validateNodeFx = createEffect<
  CreatePipeNodeRequest,
  PipeNodeValidationResultResponse
>(fetchValidateNode);
const $validationResult = createStore<
  EPipeNodeValidationMessageStringDictionaryItem[]
>([])
  .on(validateNodeFx.doneData, (_, result) => [
    ...(result?.errors || []),
    ...(result?.warnings || []),
  ])
  .reset(closeConfiramtionModal);

const $stepNumber = createStore(0)
  .on(goNextStep, (step) => step + 1)
  .on(goPrevStep, (step) => step - 1)
  .reset(CreateNodeGate.close);

const $requestPayload = createStore<CreateNodeFormPayload>({})
  .on(updateRequestPayload, (prev, data) => ({ ...prev, ...data }))
  .reset(CreateNodeGate.close);

const $building = createStore<
  HousingStockResponse | NonResidentialBuildingResponse | null
>(null)
  .on(fetchBuildingFx.doneData, (_, building) => building)
  .reset(CreateNodeGate.close);

const $calculatorsList = createStore<
  CalculatorIntoHousingStockResponse[] | null
>(null)
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

const $isConfirmationModalOpen = createStore(false)
  .on(openConfiramtionModal, () => true)
  .reset(closeConfiramtionModal);

const $nodeServiceZones = createStore<NodeServiceZoneListResponse | null>(null)
  .on(fetchNodeServiceZonesFx.doneData, (_, zones) => zones)
  .reset(CreateNodeGate.close);

sample({
  clock: CreateNodeGate.open,
  filter: (payload): payload is GetBuildingPayload =>
    Boolean(payload.buildingId && payload.houseCategory),
  target: fetchBuildingFx,
});

sample({
  source: $requestPayload.map(({ buildingId, houseCategory }) => ({
    buildingId,
    houseCategory,
  })),
  clock: sample({
    source: CreateNodeGate.state,
    clock: $requestPayload.map(({ buildingId }) => buildingId),
    filter: ({ buildingId }) => !buildingId,
  }),
  filter: (payload): payload is GetBuildingPayload =>
    Boolean(payload.houseCategory),
  target: fetchBuildingFx,
});

sample({
  source: $stepNumber,
  clock: updateRequestPayload,
  filter: (stepNumber) => stepNumber < 3,
  target: goNextStep,
});

sample({
  clock: $requestPayload,
  source: combine(
    $stepNumber,
    $requestPayload,
    (stepNumber, requestPayload) => ({
      stepNumber,
      buildingId: requestPayload.buildingId,
    }),
  ),
  filter: (source) => Boolean(source.buildingId) && source.stepNumber === 1,
  fn: (source) => source.buildingId as number,
  target: fetchCalculatorsListFx,
});

sample({
  clock: [
    CreateNodeGate.open,
    createNodeServiceZoneService.inputs.handleServiceZoneCreated,
  ],
  target: fetchNodeServiceZonesFx,
});

sample({
  source: $requestPayload,
  clock: handleSubmitForm,
  filter: (payload) => Boolean(payload.title),
  // Проверка типа идет выше
  fn: (payload) => payload as CreatePipeNodeRequest,
  target: createPipeNodeFx,
});

sample({
  source: $requestPayload,
  clock: validateNode,
  filter: (payload) => Boolean(payload.title),
  // Проверка типа идет выше
  fn: (payload) => payload as CreatePipeNodeRequest,
  target: validateNodeFx,
});

sample({
  clock: validateNodeFx.doneData,
  target: openConfiramtionModal,
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

const $isLoadingBuilding = fetchBuildingFx.pending;
const $isCreatePipeNodeLoading = createPipeNodeFx.pending;
const $isValidationLoading = validateNodeFx.pending;

const handlePipeNodeCreated = createPipeNodeFx.doneData;

sample({
  clock: handlePipeNodeCreated,
  target: closeConfiramtionModal,
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
    $building,
    $existingCities: addressSearchService.outputs.$existingCities,
    $existingStreets: addressSearchService.outputs.$existingStreets,
    $isLoadingBuilding,
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
