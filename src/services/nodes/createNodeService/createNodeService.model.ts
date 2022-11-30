import { $existingStreets } from '01/features/housingStocks/displayHousingStockStreets/model';
import { $existingCities } from '01/features/housingStocks/displayHousingStockCities/models';
import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { HousingStockResponse } from 'myApi';
import { getHousingStock } from './createNodeService.api';

const domain = createDomain('createNodeService');

const fetchHousingStockFx = domain.createEffect<number, HousingStockResponse>(
  getHousingStock
);

const CreateNodeGate = createGate<{ housingStockId: number }>();

const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(fetchHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(CreateNodeGate.close);

forward({
  from: CreateNodeGate.open.map(({ housingStockId }) => housingStockId),
  to: fetchHousingStockFx,
});

const $isLoadingHousingStock = fetchHousingStockFx.pending;

export const createNodeService = {
  inputs: {},
  outputs: {
    $housingStock,
    $existingCities,
    $existingStreets,
    $isLoadingHousingStock,
  },
  gates: { CreateNodeGate },
};
