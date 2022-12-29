import { createDomain, guard } from 'effector';
import { createGate } from 'effector-react';
import {
  GetHousingStocksListRequestPayload,
  GetHousingStocksRequestPayload,
} from './HousesReadingsService.types';
import { HousingStockResponse } from 'myApi';
import { getHousingStock } from './HousesReadingsService.api';
import { InspectorGate, $inspector } from '01/features/Inspectors/models';

const domain = createDomain('housesReadingsService');

const HousingStockGate = createGate<{ housingStockId: number | null }>();

const handleSearchHousingStock = domain.createEvent<GetHousingStocksListRequestPayload>();

const fetchHousingStockFx = domain.createEffect<
  GetHousingStocksRequestPayload,
  HousingStockResponse | null
>(getHousingStock);

const $housingStock = domain
  .createStore<HousingStockResponse | null>(null)
  .on(fetchHousingStockFx.doneData, (_, housingStock) => housingStock)
  .reset(HousingStockGate.close);

guard({
  clock: handleSearchHousingStock,
  filter: ({ City, Street, HousingStockNumber }) => {
    return [City, Street, HousingStockNumber].every(Boolean);
  },
  target: fetchHousingStockFx,
});

guard({
  clock: HousingStockGate.open.map(({ housingStockId }) => ({
    HousingStockId: housingStockId,
  })),
  filter: ({ HousingStockId }) => Boolean(HousingStockId),
  target: fetchHousingStockFx,
});

const $isLoadingHousingStock = fetchHousingStockFx.pending;

export const housesReadingsService = {
  inputs: { handleSearchHousingStock },
  outputs: {
    $housingStock,
    $isLoadingHousingStock,
    $inspector,
  },
  gates: {
    HousingStockGate,
    InspectorGate,
  },
};
