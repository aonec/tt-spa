import {
  $calculatorTypesSelectItems,
  CalculatorInfosGate,
} from '01/features/carlculators/calculatorsInfo/models';
import { createDomain } from 'effector';

const domain = createDomain('editMainInfoService');

export const editMainInfoService = {
  inputs: {},
  outputs: {
    $calculatorTypesSelectItems,
  },
  gates: { CalculatorInfosGate },
};
