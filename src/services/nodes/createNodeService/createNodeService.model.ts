import { combine, createDomain, sample } from 'effector';
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
} from 'myApi';
import { createNodeServiceZoneService } from './../createNodeServiceZoneService/createNodeServiceZoneService.model';
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

const domain = createDomain('createNodeService');

const createPipeNodeFx = domain.createEffect<
  CreatePipeNodeRequest,
  PipeNodeResponse,
  EffectFailDataAxiosError
>(postPipeNode);

const fetchBuildingFx = domain.createEffect<
  GetBuildingPayload,
  HousingStockResponse | NonResidentialBuildingResponse
>(getBuilding);

const handleSubmitForm = domain.createEvent();

const fetchCalculatorsListFx = domain.createEffect<
  number,
  CalculatorIntoHousingStockResponse[] | null
>(getCalculatorsList);

const fetchNodeServiceZonesFx = domain.createEffect<
  void,
  NodeServiceZoneListResponse | null
>(getNodeServiceZones);

const CreateNodeGate = createGate<{
  buildingId: number;
  houseCategory?: EHouseCategory;
}>();

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

const $building = domain
  .createStore<HousingStockResponse | NonResidentialBuildingResponse | null>(
    null,
  )
  .on(fetchBuildingFx.doneData, (_, building) => building)
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
  source: $requestPayload.map(({ buildingId }) => buildingId || null),
  clock: $requestPayload,
  filter: (id): id is number => Boolean(id),
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
  target: createPipeNodeFx,
});

sample({
  source: $requestPayload,
  clock: validateNode,
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
