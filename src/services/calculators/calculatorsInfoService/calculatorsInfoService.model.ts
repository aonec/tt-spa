import { Store, createDomain, forward } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorInfoListResponse } from 'myApi';
import { CalculatorInfoItem } from './calculatorsInfoService.types';
import { getCalculatorInfos } from './calculatorsInfoService.api';

const domain = createDomain('calculatorsInfoService');

const CalculatorInfosGate = createGate();

const fetchCalculatorTypesFx = domain.createEffect<
  void,
  CalculatorInfoListResponse[] | null
>(getCalculatorInfos);

const $calculatorTypes = domain
  .createStore<CalculatorInfoListResponse[] | null>(null)
  .on(fetchCalculatorTypesFx.doneData, (_, data) => data)
  .reset(CalculatorInfosGate.close);

const $calculatorTypesSelectItems: Store<CalculatorInfoItem[]> =
  $calculatorTypes.map<CalculatorInfoItem[]>(
    (types): CalculatorInfoItem[] =>
      types?.map((type) => ({
        id: type.id,
        value: type.id,
        model: type.model || 'N/A',
        label: type.model || 'N/A',
      })) || [],
  );

forward({
  from: CalculatorInfosGate.open,
  to: fetchCalculatorTypesFx,
});

export const calculatorsInfoService = {
  outputs: { $calculatorTypesSelectItems },
  gates: { CalculatorInfosGate },
};
