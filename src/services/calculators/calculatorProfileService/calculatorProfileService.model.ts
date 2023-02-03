import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorResponse } from 'myApi';
import { fetchCalculator } from './calculatorProfileService.api';
import { CalculatorProfileGrouptype } from './calculatorProfileService.constants';
import { consumptionReportCalculatorService } from '../consumptionReportCalculatorService';
import { calculatorCommentService } from './CalculatorProfile/calculatorCommentService';

const domain = createDomain('calculatorProfileService');

const clearStore = domain.createEvent();
const refetchCalculator = domain.createEvent();
const handleFecthCalculator = domain.createEvent<number>();

const setCalculatorGrouptype = domain.createEvent<CalculatorProfileGrouptype>();
const $currentCalculatorGrouptype = domain
  .createStore<CalculatorProfileGrouptype>(CalculatorProfileGrouptype.Common)
  .on(setCalculatorGrouptype, (_, grouptype) => grouptype)
  .reset(clearStore);

const getCalculatorFx = domain.createEffect<number, CalculatorResponse>(
  fetchCalculator,
);

const $calculator = domain
  .createStore<CalculatorResponse | null>(null)
  .on(getCalculatorFx.doneData, (_, device) => device)
  .on(calculatorCommentService.inputs.commentEdited, (calculator, comment) => {
    if (calculator) {
      return {
        ...calculator,
        comment,
      };
    }
    return null;
  })
  .on(calculatorCommentService.inputs.commentDelited, (calculator) => {
    if (calculator) {
      return { ...calculator, comment: null };
    }
    return null;
  })
  .reset(clearStore);

const $isLoading = getCalculatorFx.pending;

const CalculatorIdGate = createGate<{ id: number }>();

sample({
  clock: CalculatorIdGate.open.map(({ id }) => id),
  target: getCalculatorFx,
});

forward({
  from: handleFecthCalculator,
  to: getCalculatorFx,
});

sample({
  source: CalculatorIdGate.open.map(({ id }) => id),
  clock: refetchCalculator,
  target: getCalculatorFx,
});

forward({
  from: CalculatorIdGate.close,
  to: clearStore,
});

export const calculatorProfileService = {
  inputs: {
    setCalculatorGrouptype,
    refetchCalculator,
    clearStore,
    handleFecthCalculator,
    handleConsumptionReportModalOpen:
      consumptionReportCalculatorService.inputs.handleModalOpen,
  },
  outputs: {
    $calculator,
    $isLoading,
    $currentCalculatorGrouptype,
  },
  gates: { CalculatorIdGate },
};
