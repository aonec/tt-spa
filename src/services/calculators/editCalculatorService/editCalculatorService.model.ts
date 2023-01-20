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
import { message } from 'antd';

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

const editCalculatorSuccess = editCalculatorFx.doneData;

editCalculatorFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

editCalculatorSuccess.watch(() =>
  message.success('Вычислитель успешно обновлён!')
);

export const editCalculatorService = {
  inputs: { handleChangeTab, handleSubmit, editCalculatorSuccess },
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
