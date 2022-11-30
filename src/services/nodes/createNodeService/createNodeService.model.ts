import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { createDomain, forward, guard } from 'effector';
import { createGate } from 'effector-react';
import { CreatePipeNodeRequest, HousingStockResponse } from 'myApi';
import { getHousingStock } from './createNodeService.api';

const domain = createDomain('createNodeService');

const fetchHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  getHousingStock
);

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

guard({
  clock: CreateNodeGate.open.map(({ housingStockId }) => housingStockId),
  filter: Boolean,
  target: fetchHousingStockFx,
});

forward({
  from: updateRequestPayload,
  to: goNextStep,
});

const $isLoadingHousingStock = fetchHousingStockFx.pending;

export const createNodeService = {
  inputs: {
    goPrevStep,
    updateRequestPayload,
  },
  outputs: {
    $housingStock,
    $existingCities,
    $existingStreets,
    $isLoadingHousingStock,
    $stepNumber,
  },
  gates: { CreateNodeGate },
};
