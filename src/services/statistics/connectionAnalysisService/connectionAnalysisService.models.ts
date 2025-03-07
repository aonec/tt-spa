import { createEffect, createStore, sample } from 'effector';
import { getCalculators } from './connectionAnalysisService.api';
import { createGate } from 'effector-react';
import { CalculatorsSortedListApi } from './connectionAnalysisService.types';

const PageGate = createGate();

const getCalculatorsFx = createEffect<void, CalculatorsSortedListApi>(
  getCalculators,
);

const $isLoading = getCalculatorsFx.pending;

const $calculatorsSortedList = createStore<CalculatorsSortedListApi | null>(
  null,
).on(getCalculatorsFx.doneData, (_, data) => {
  return data;
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
