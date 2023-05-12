import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorIntoHousingStockResponse } from 'myApi';
import { getCalculatorsList } from './calculatorsListService.api';
import { createCalcuatorService } from '01/features/nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models';

const domain = createDomain('calculatorsListService');

const CalculatorsGate = createGate<{ housingStockId: number }>();

const refetchCalculators = domain.createEvent();

const fetchCalculatorsFx = domain.createEffect<
  number,
  CalculatorIntoHousingStockResponse[]
>(getCalculatorsList);

const $calculatorsList = domain
  .createStore<CalculatorIntoHousingStockResponse[] | null>(null)
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset(fetchCalculatorsFx.failData);

const $loading = fetchCalculatorsFx.pending;

sample({
  clock: refetchCalculators,
  source: CalculatorsGate.state.map(({ housingStockId }) => housingStockId),
  filter: (housingStockId) => Boolean(housingStockId),
  target: fetchCalculatorsFx,
});

forward({
  from: CalculatorsGate.state.map(({ housingStockId }) => housingStockId),
  to: fetchCalculatorsFx,
});

forward({
  from: createCalcuatorService.events.newCalculatorCreated,
  to: refetchCalculators,
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
