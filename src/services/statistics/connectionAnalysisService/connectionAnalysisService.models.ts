import { createEffect, createStore, sample } from 'effector';
import { getCalculators } from './connectionAnalysisService.api';
import { CalculatorListResponsePagedList } from 'api/types';
import { createGate } from 'effector-react';
import { sortCalculator } from './connectionAnalysisService.utils';
import { CalculatorsSortedList } from './connectionAnalysisService.types';

const PageGate = createGate();

const getCalculatorsFx = createEffect<void, CalculatorListResponsePagedList>(
  getCalculators,
);

const $isLoading = getCalculatorsFx.pending;

const $calculatorsSortedList = createStore<CalculatorsSortedList | null>(
  null,
).on(getCalculatorsFx.doneData, (_, data) => {
  const list = data.items;
  if (!list) return null;
  return sortCalculator(list);
});

sample({
  clock: PageGate.open,
  target: getCalculatorsFx,
});

export const connectionAnalysisService = {
  inputs: {},
  outputs: { $calculatorsSortedList, $isLoading },
  gates: { PageGate },
};
