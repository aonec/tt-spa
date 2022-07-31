import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { CalculatorInfoListResponse } from '../../../../../api/types';
import { SelectItem } from '../../../../tt-components/localBases';

const calculatorInfosDomain = createDomain('calculatorInfos');

export const $calculatorTypes = calculatorInfosDomain.createStore<
  CalculatorInfoListResponse[] | null
>(null);

export const fetchCalculatorTypesFx = calculatorInfosDomain.createEffect<
  void,
  CalculatorInfoListResponse[] | null
>();

export const CalculatorInfosGate = createGate();

export const $calculatorTypesSelectItems = $calculatorTypes.map<SelectItem[]>(
  (types) =>
    types?.map((type) => ({
      id: type.id,
      value: type.id,
      model: type.model || 'N/A',
      label: type.model || 'N/A',
    })) || []
);
