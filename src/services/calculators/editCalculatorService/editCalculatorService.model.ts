import { createDomain, sample } from 'effector';
import { EditCalculatorTabs } from './view/EditCalculatorPage/EditCalculatorPage.types';
import { calculatorProfileService } from '../calculatorProfileService';
import {
  $calculatorTypesSelectItems,
  CalculatorInfosGate,
} from '01/features/carlculators/calculatorsInfo/models';
import { putCalculator } from './editCalculatorService.api';
import { EffectFailDataAxiosError } from 'types';
import { MeteringDeviceResponse, UpdateCalculatorRequest } from 'myApi';
import { createGate } from 'effector-react';

const domain = createDomain('editCalculatorService');

const handleChangeTab = domain.createEvent<EditCalculatorTabs>();

const handleSubmit = domain.createEvent<UpdateCalculatorRequest>();

const SaveDeviceIdGate = createGate<{ deviceId: number }>();

const editCalculatorFx = domain.createEffect<
  { deviceId: number; form: UpdateCalculatorRequest },
  MeteringDeviceResponse | null,
  EffectFailDataAxiosError
>(putCalculator);

const $currentTab = domain
  .createStore<EditCalculatorTabs>(EditCalculatorTabs.CommonInfo)
  .on(handleChangeTab, (_, tab) => tab);

sample({
  clock: handleSubmit,
  source: SaveDeviceIdGate.state,
  fn: (gateState, submitState) => {
    return { deviceId: gateState.deviceId, form: submitState };
  },
  target: editCalculatorFx,
});

export const editCalculatorService = {
  inputs: { handleChangeTab, handleSubmit },
  outputs: {
    $calculator: calculatorProfileService.outputs.$calculator,
    $currentTab,
    $calculatorTypesSelectItems,
  },
  gates: {
    CalculatorInfosGate,
    CalculatorIdGate: calculatorProfileService.gates.CalculatorIdGate,
    SaveDeviceIdGate,
  },
};
