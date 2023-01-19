import { createDomain } from 'effector';
import { EditCalculatorTabs } from './view/EditCalculatorPage/EditCalculatorPage.types';
import { calculatorProfileService } from '../calculatorProfileService';
import {
  $calculatorTypesSelectItems,
  CalculatorInfosGate,
} from '01/features/carlculators/calculatorsInfo/models';

const domain = createDomain('editCalculatorService');

const handleChangeTab = domain.createEvent<EditCalculatorTabs>();

const $currentTab = domain
  .createStore<EditCalculatorTabs>(EditCalculatorTabs.CommonInfo)
  .on(handleChangeTab, (_, tab) => tab);

export const editCalculatorService = {
  inputs: { handleChangeTab },
  outputs: {
    $calculator: calculatorProfileService.outputs.$calculator,
    $currentTab,
    $calculatorTypesSelectItems,
  },
  gates: {
    CalculatorInfosGate,
    CalculatorIdGate: calculatorProfileService.gates.CalculatorIdGate,
  },
};
