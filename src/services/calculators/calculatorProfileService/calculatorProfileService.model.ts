import { createEffect, createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorResponse } from 'api/types';
import { fetchCalculator } from './calculatorProfileService.api';
import { consumptionReportCalculatorService } from '../consumptionReportCalculatorService';
import { meteringDevicesService } from 'services/devices/resourceAccountingSystemsService/view/ResourceAccountingSystems/meteringDevicesService';
import { calculatorCommentService } from './CalculatorProfile/calculatorCommentService';

const clearStore = createEvent();
const refetchCalculator = createEvent();
const handleFecthCalculator = createEvent<number>();

const getCalculatorFx = createEffect<number, CalculatorResponse>(
  fetchCalculator,
);

const $calculator = createStore<CalculatorResponse | null>(null)
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
    refetchCalculator,
    clearStore,
    handleFecthCalculator,
    handleConsumptionReportModalOpen:
      consumptionReportCalculatorService.inputs.handleModalOpen,
    openDevicesListModal: meteringDevicesService.inputs.openDevicesListModal,
  },
  outputs: {
    $calculator,
    $isLoading,
  },
  gates: { CalculatorIdGate },
};
