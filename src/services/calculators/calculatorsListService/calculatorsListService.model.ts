import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorIntoHousingStockResponse } from 'api/types';
import { getCalculatorsList } from './calculatorsListService.api';

const CalculatorsGate = createGate<{ buildingId: number }>();

const refetchCalculators = createEvent();

const fetchCalculatorsFx = createEffect<
  number,
  CalculatorIntoHousingStockResponse[]
>(getCalculatorsList);

const $calculatorsList = createStore<
  CalculatorIntoHousingStockResponse[] | null
>(null)
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset(fetchCalculatorsFx.failData);

const $loading = fetchCalculatorsFx.pending;

sample({
  clock: CalculatorsGate.open.map(({ buildingId }) => buildingId),
  target: fetchCalculatorsFx,
});

sample({
  clock: refetchCalculators,
  source: CalculatorsGate.state.map(({ buildingId }) => buildingId || null),
  filter: (buildingId): buildingId is number => Boolean(buildingId),
  target: fetchCalculatorsFx,
});

sample({
  clock: CalculatorsGate.state.map(({ buildingId }) => buildingId || null),
  filter: (id): id is number => Boolean(id),
  target: fetchCalculatorsFx,
});

export const calculatorsListService = {
  inputs: {
    refetchCalculators,
  },
  outputs: {
    $calculatorsList,
    $loading,
  },
  gates: { CalculatorsGate },
};
