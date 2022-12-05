import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { combine, createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  CalculatorIntoHousingStockResponse,
  CreatePipeNodeRequest,
  HousingStockResponse,
} from 'myApi';
import { getCalculatorsList, getHousingStock } from './createNodeService.api';
import { createCalcuatorService } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models';

const domain = createDomain('createNodeService');

const fetchHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  getHousingStock
);

const fetchCalculatorsListFx = domain.createEffect<
  number,
  CalculatorIntoHousingStockResponse[] | null
>(getCalculatorsList);

const CreateNodeGate = createGate<{ housingStockId: number }>();

const updateRequestPayload = domain.createEvent<CreatePipeNodeRequest>();

const goNextStep = domain.createEvent();

const goPrevStep = domain.createEvent();

const $stepNumber = domain
  .createStore(0)
  .on(goNextStep, (number) => (number === 3 ? number : number + 1))
  .on(goPrevStep, (number) => (number === 0 ? number : number - 1))
  .reset(CreateNodeGate.close);

const $requestPayload = domain
  .createStore<CreatePipeNodeRequest>({})
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
    createCalcuatorService.events.newCalculatorCreated,
    (prev, newCalculator) => [
      ...(prev || []),
      {
        id: newCalculator.id,
        serialNumber: newCalculator.serialNumber,
        model: newCalculator.model,
        calculatorInfoId: null,
      },
    ]
  )
  .reset(CreateNodeGate.close);

guard({
  clock: CreateNodeGate.open.map(({ housingStockId }) => housingStockId),
  filter: Boolean,
  target: fetchHousingStockFx,
});

guard({
  source: $requestPayload.map(({ housingStockId }) => housingStockId),
  clock: guard({
    source: CreateNodeGate.state,
    clock: $requestPayload.map(({ housingStockId }) => housingStockId),
    filter: ({ housingStockId }) => !housingStockId,
  }),
  filter: Boolean,
  target: fetchHousingStockFx,
});

forward({
  from: updateRequestPayload,
  to: goNextStep,
});

guard({
  clock: $requestPayload.map(({ housingStockId }) => housingStockId),
  filter: (id): id is number => Boolean(id),
  target: fetchCalculatorsListFx,
});

const $isLoadingHousingStock = fetchHousingStockFx.pending;

export const createNodeService = {
  inputs: {
    goPrevStep,
    updateRequestPayload,
    openCreateCalculatorModal:
      createCalcuatorService.inputs.openCreateCalculatorModal,
  },
  outputs: {
    $housingStock,
    $existingCities,
    $existingStreets,
    $isLoadingHousingStock,
    $stepNumber,
    $calculatorsList,
    $requestPayload,
  },
  gates: {
    CreateNodeGate,
    CreateCalculatorGate: createCalcuatorService.gates.CreateCalculatorGate,
  },
};
