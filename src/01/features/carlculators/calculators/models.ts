import { createGate } from 'effector-react';
import { CalculatorsListRequestPayload } from './types';
import {
  CalculatorListResponse,
  CalculatorListResponsePagedList,
} from './../../../../myApi';
import { createDomain, forward, sample } from 'effector';
import { createCalcuatorService } from '../../nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models';
import { getCalculatorsList } from './api';

const calculatorsDomain = createDomain('calculatorsDomain');

const $calculators = calculatorsDomain.createStore<
  CalculatorListResponse[] | null
>(null);

const fetchCalculatorsFx = calculatorsDomain.createEffect<
  CalculatorsListRequestPayload,
  CalculatorListResponsePagedList
>(getCalculatorsList);

const refetchCalculators = calculatorsDomain.createEvent();

const $loading = fetchCalculatorsFx.pending;

const CalculatorsGate = createGate<{ params: CalculatorsListRequestPayload }>();

$calculators
  .on(fetchCalculatorsFx.doneData, (_, data) => data.items)
  .reset(fetchCalculatorsFx.failData);

forward({
  from: CalculatorsGate.open.map(({ params }) => params),
  to: fetchCalculatorsFx,
});

sample({
  source: CalculatorsGate.state.map(({ params }) => params),
  clock: refetchCalculators,
  target: fetchCalculatorsFx,
});

forward({
  from: createCalcuatorService.events.newCalculatorCreated,
  to: refetchCalculators,
});

export const calculatorsService = {
  inputs: {
    CalculatorsGate,
    refetchCalculators,
  },
  outputs: {
    $calculators,
    $loading,
  },
};
