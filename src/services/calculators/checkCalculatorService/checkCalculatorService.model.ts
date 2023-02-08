import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { CalculatorResponse, CheckDeviceRequest } from 'myApi';
import { calculatorProfileService } from '../calculatorProfileService';
import { fetchCloseCalculator } from './checkCalculatorService.api';
import { CheckCalculatorFormik } from './checkCalculatorService.types';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('checkCalculatorService');

const openModal = domain.createEvent<CalculatorResponse>();
const closeModal = domain.createEvent();

const $calculatorInfo = domain
  .createStore<CalculatorResponse | null>(null)
  .on(openModal, (_, calculator) => calculator)
  .reset(closeModal);

const $isModalOpen = $calculatorInfo.map(Boolean);

const checkCalculator = domain.createEvent<CheckCalculatorFormik>();
const checkCalculatorFx = domain.createEffect<
  CheckDeviceRequest,
  void,
  EffectFailDataAxiosError
>(fetchCloseCalculator);

sample({
  source: guard({
    source: $calculatorInfo,
    filter: Boolean,
  }),
  clock: checkCalculator,
  fn: ({ id }, payload) => ({
    ...payload,
    deviceId: id,
  }),
  target: checkCalculatorFx,
});

forward({
  from: checkCalculatorFx.doneData,
  to: [closeModal, calculatorProfileService.inputs.refetchCalculator],
});

checkCalculatorFx.doneData.watch(() => {
  message.success('Вычислитель успешно поверен');
});

checkCalculatorFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(error.response.data.error.Text);
});

export const checkCalculatorService = {
  inputs: {
    openModal,
    closeModal,
    checkCalculator,
  },
  outputs: {
    $isModalOpen,
    $calculatorInfo,
  },
};
