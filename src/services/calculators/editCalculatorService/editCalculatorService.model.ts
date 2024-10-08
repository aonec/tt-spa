import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { EditCalculatorTabs } from './view/EditCalculatorPage/EditCalculatorPage.types';
import { calculatorProfileService } from '../calculatorProfileService';
import {
  getAlreadyExistingConnectionCalculator,
  putCalculator,
} from './editCalculatorService.api';
import {
  EffectFailDataAxiosError,
  EffectFailDataAxiosErrorDataId,
} from 'types';
import {
  CalculatorResponse,
  MeteringDeviceResponse,
  UpdateCalculatorRequest,
} from 'api/types';
import { createGate } from 'effector-react';
import { message } from 'antd';
import { calculatorsInfoService } from '../calculatorsInfoService';

const handleChangeTab = createEvent<EditCalculatorTabs>();

const handleSubmit = createEvent<UpdateCalculatorRequest>();

const handleAlreadyExistingConnection = createEvent<{ id: number }>();
const handleExisingConnectionError = createEvent();
const handleCloseModal = createEvent();

const SaveDeviceIdGate = createGate<{ deviceId: number }>();

const editCalculatorFx = createEffect<
  { deviceId: number; form: UpdateCalculatorRequest },
  MeteringDeviceResponse | null,
  EffectFailDataAxiosErrorDataId
>(putCalculator);

const getSameConnectionCalculatorFx = createEffect<
  number,
  CalculatorResponse | null,
  EffectFailDataAxiosError
>(getAlreadyExistingConnectionCalculator);

const $currentTab = createStore<EditCalculatorTabs>(
  EditCalculatorTabs.CommonInfo,
).on(handleChangeTab, (_, tab) => tab);

const $isModalOpen = createStore<boolean>(false)
  .on(handleExisingConnectionError, () => true)
  .on(handleCloseModal, () => false);

const $sameConnectionCalculator = createStore<CalculatorResponse | null>(
  null,
).on(
  getSameConnectionCalculatorFx.doneData,
  (_, calculatorData) => calculatorData,
);

sample({
  clock: handleSubmit,
  source: SaveDeviceIdGate.state,
  fn: (gateState, submitState) => {
    return { deviceId: gateState.deviceId, form: submitState };
  },
  target: editCalculatorFx,
});

const editCalculatorSuccess = editCalculatorFx.doneData;
const editCalculatorFailData = editCalculatorFx.failData;

sample({
  clock: sample({
    clock: editCalculatorFailData,
    filter: (errorData) => {
      return errorData.response.status === 409;
    },
  }),
  fn: (errorData) => Number(errorData.response.data.error.Data.Id),
  target: [getSameConnectionCalculatorFx, handleExisingConnectionError],
});

editCalculatorFailData.watch((error) => {
  message.error(error.response.data.error.Text);
});

editCalculatorSuccess.watch(() =>
  message.success('Вычислитель успешно обновлён!'),
);

export const editCalculatorService = {
  inputs: {
    handleChangeTab,
    handleSubmit,
    editCalculatorSuccess,
    handleAlreadyExistingConnection,
    handleCloseModal,
    handleFecthCalculator:
      calculatorProfileService.inputs.handleFecthCalculator,
  },
  outputs: {
    $calculator: calculatorProfileService.outputs.$calculator,
    $isLoading: calculatorProfileService.outputs.$isLoading,
    $currentTab,
    $calculatorTypesSelectItems:
      calculatorsInfoService.outputs.$calculatorTypesSelectItems,
    $sameConnectionCalculator,
    $isModalOpen,
  },
  gates: {
    CalculatorInfosGate: calculatorsInfoService.gates.CalculatorInfosGate,
    SaveDeviceIdGate,
  },
};
