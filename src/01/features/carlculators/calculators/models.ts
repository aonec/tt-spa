import { createGate } from 'effector-react';
import { CalculatorsListRequestPayload } from './types';
import { CalculatorListResponse, CalculatorListResponsePagedList } from './../../../../myApi';
import { createDomain, forward } from 'effector';
import axios from '01/axios';

const calculatorsDomain = createDomain('calculatorsDomain');

const $calculators = calculatorsDomain.createStore<CalculatorListResponse[]>(
  []
);

const fetchCalculatorsFx = calculatorsDomain.createEffect<
  CalculatorsListRequestPayload,
  CalculatorListResponsePagedList
>((payload) => {
  return axios.get('Calculators', { params: payload });
});

const $loading = fetchCalculatorsFx.pending;

const CalculatorsGate = createGate<{ params: CalculatorsListRequestPayload }>();

$calculators
  .on(fetchCalculatorsFx.doneData, (_, data) => data.items as any)
  .reset(fetchCalculatorsFx.failData);

forward({
  from: CalculatorsGate.open.map(({ params }) => params),
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
