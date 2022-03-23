import { createGate } from 'effector-react';
import { CalculatorsListRequestPayload } from './types';
import { CalculatorListResponse } from './../../../../myApi';
import { createDomain, forward } from 'effector';
import axios from '01/axios';

const calculatorsDomain = createDomain('calculatorsDomain');

const $calculators = calculatorsDomain.createStore<
  CalculatorListResponse[] | null
>(null);

const fetchCalculatorsFx = calculatorsDomain.createEffect<
  CalculatorsListRequestPayload,
  CalculatorListResponse[]
>((payload) => {
  return axios.get('Calculators', { params: payload });
});

const $loading = fetchCalculatorsFx.pending;

const CalculatorsGate = createGate<CalculatorsListRequestPayload>();

$calculators
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset(fetchCalculatorsFx.failData);

forward({
  from: CalculatorsGate.open,
  to: fetchCalculatorsFx,
});

export const calculatorsService = {
  inputs: {
    CalculatorsGate,
  },
  outputs: {
    $calculators,
    $loading,
  },
};
