import { createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorResponse } from 'myApi';
import { fetchCalculator } from './calculatorProfileService.api';
import { CalculatorProfileGrouptype } from './calculatorProfileService.constants';

const domain = createDomain('calculatorProfileService');

const clearStore = domain.createEvent();

const setCalculatorGrouptype = domain.createEvent<CalculatorProfileGrouptype>();
const $currentCalculatorGrouptype = domain
  .createStore<CalculatorProfileGrouptype>(CalculatorProfileGrouptype.Common)
  .on(setCalculatorGrouptype, (_, grouptype) => grouptype)
  .reset(clearStore);

const getCalculatorFx = domain.createEffect<number, CalculatorResponse>(
  fetchCalculator
);

const $calculator = domain
  .createStore<CalculatorResponse | null>(null)
  .on(getCalculatorFx.doneData, (_, device) => device)
  .reset(clearStore);

const $isLoading = getCalculatorFx.pending;

const CalculatorIdGate = createGate<{ id: number }>();

forward({
  from: CalculatorIdGate.open.map(({ id }) => id),
  to: getCalculatorFx,
});

forward({
  from: CalculatorIdGate.close,
  to: clearStore,
});

export const calculatorProfileService = {
  inputs: {
    setCalculatorGrouptype,
  },
  outputs: {
    $calculator,
    $isLoading,
    $currentCalculatorGrouptype,
  },
  gates: { CalculatorIdGate },
};
