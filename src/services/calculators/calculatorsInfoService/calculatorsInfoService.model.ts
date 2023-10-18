import { createEffect, createStore } from 'effector';
import { forward } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorInfoListResponse } from 'api/types';
import { getCalculatorInfos } from './calculatorsInfoService.api';

const CalculatorInfosGate = createGate();

const fetchCalculatorTypesFx = createEffect<
  void,
  CalculatorInfoListResponse[] | null
>(getCalculatorInfos);

const $calculatorTypes = createStore<CalculatorInfoListResponse[] | null>(null)
  .on(fetchCalculatorTypesFx.doneData, (_, data) => {
    return data;
  })
  .reset(CalculatorInfosGate.close);

const $calculatorTypesSelectItems = $calculatorTypes.map((types) => {
  if (!types) return [];

  return types?.map((type) => ({
    id: type.id,
    value: type.id,
    model: type.model || 'N/A',
    label: type.model || 'N/A',
  }));
});

forward({
  from: CalculatorInfosGate.open,
  to: fetchCalculatorTypesFx,
});

export const calculatorsInfoService = {
  outputs: { $calculatorTypesSelectItems },
  gates: { CalculatorInfosGate },
};
