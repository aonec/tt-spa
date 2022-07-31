import { createGate } from "effector-react";

import { createDomain, forward, sample } from "effector";
import { createCalcuatorService } from "../../nodes/editNode/editNodeCalculatorConnection/components/AddNodeCalculatorConnectionModal/CreateCalculatorModal/models";
import { getCalculatorsList } from "./calculatorsIntoHousingStockService.api";
import { CalculatorIntoHousingStockResponse } from "../../../../api/types";

const domain = createDomain("calculatorsIntoHousingStockService");

const $calculators = domain.createStore<
  CalculatorIntoHousingStockResponse[] | null
>(null);

const fetchCalculatorsFx = domain.createEffect<
  number,
  CalculatorIntoHousingStockResponse[]
>(getCalculatorsList);

const refetchCalculators = domain.createEvent();

const $loading = fetchCalculatorsFx.pending;

const CalculatorsGate = createGate<{ housingStockId: number }>();

$calculators
  .on(fetchCalculatorsFx.doneData, (_, data) => data)
  .reset(fetchCalculatorsFx.failData);

forward({
  from: CalculatorsGate.open.map(({ housingStockId }) => housingStockId),
  to: fetchCalculatorsFx,
});

sample({
  source: CalculatorsGate.state.map(({ housingStockId }) => housingStockId),
  clock: refetchCalculators,
  target: fetchCalculatorsFx,
});

forward({
  from: createCalcuatorService.events.newCalculatorCreated,
  to: refetchCalculators,
});

export const calculatorsIntoHousingStockService = {
  inputs: {
    CalculatorsGate,
    refetchCalculators,
  },
  outputs: {
    $calculators,
    $loading,
  },
};
