import { createDomain, guard, sample } from 'effector';
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
} from 'api/myApi';
import { createGate } from 'effector-react';
import { message } from 'antd';
import { calculatorsInfoService } from '../calculatorsInfoService';

const domain = createDomain('editCalculatorService');

const handleChangeTab = domain.createEvent<EditCalculatorTabs>();

const handleSubmit = domain.createEvent<UpdateCalculatorRequest>();

const handleAlreadyExistingConnection = domain.createEvent<{ id: number }>();
const handleExisingConnectionError = domain.createEvent();
const handleCloseModal = domain.createEvent();

const SaveDeviceIdGate = createGate<{ deviceId: number }>();

const editCalculatorFx = domain.createEffect<
  { deviceId: number; form: UpdateCalculatorRequest },
  MeteringDeviceResponse | null,
  EffectFailDataAxiosErrorDataId
>(putCalculator);

const getSameConnectionCalculatorFx = domain.createEffect<
  number,
  CalculatorResponse | null,
  EffectFailDataAxiosError
>(getAlreadyExistingConnectionCalculator);

const $currentTab = domain
  .createStore<EditCalculatorTabs>(EditCalculatorTabs.CommonInfo)
  .on(handleChangeTab, (_, tab) => tab);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleExisingConnectionError, () => true)
  .on(handleCloseModal, () => false);

const $sameConnectionCalculator = domain
  .createStore<CalculatorResponse | null>(null)
  .on(
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
  clock: guard({
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
