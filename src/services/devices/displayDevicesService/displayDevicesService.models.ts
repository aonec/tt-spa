

import { createGate } from 'effector-react';

import { createDomain, forward, sample } from 'effector';
import { getCalculatorsList } from './displayDevicesService.api';
import { CalculatorListResponse, CalculatorListResponsePagedList } from 'myApi';
import { CalculatorsListRequestPayload } from '01/features/carlculators/calculators/types';
import { createCalcuatorService } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models';


const displayDevicesServiceDomain = createDomain(
  'displayDevicesService'
);


const $calculators = displayDevicesServiceDomain.createStore<
  CalculatorListResponse[] | null
>(null);

const fetchCalculatorsFx = displayDevicesServiceDomain.createEffect<
  CalculatorsListRequestPayload,
  CalculatorListResponsePagedList
>(getCalculatorsList);

const fetchCalculators = displayDevicesServiceDomain.createEvent();

const $loading = fetchCalculatorsFx.pending;

const DisplayCalculatorsGate = createGate<{ params: CalculatorsListRequestPayload }>();

$calculators
  .on(fetchCalculatorsFx.doneData, (_, data) => data.items)
  .reset(fetchCalculatorsFx.failData);

forward({
  from: DisplayCalculatorsGate.open.map(({ params }) => params),
  to: fetchCalculatorsFx,
});

sample({
  source: DisplayCalculatorsGate.state.map(({ params }) => params),
  clock: fetchCalculators,
  target: fetchCalculatorsFx,
});

forward({
  from: createCalcuatorService.events.newCalculatorCreated,
  to: fetchCalculators,
});

export const displayDevicesService = {
  inputs: {
    DisplayCalculatorsGate,
    fetchCalculators,
  },
  outputs: {
    $calculators,
    $loading,
  },
};
