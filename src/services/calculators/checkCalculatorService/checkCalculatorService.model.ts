import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { forward, guard, sample } from 'effector';
import { CalculatorResponse, CheckDeviceRequest } from 'api/types';
import { calculatorProfileService } from '../calculatorProfileService';
import { fetchCloseCalculator } from './checkCalculatorService.api';
import { CheckCalculatorFormik } from './checkCalculatorService.types';
import { EffectFailDataAxiosError } from 'types';

const openModal = createEvent<CalculatorResponse>();
const closeModal = createEvent();

const $calculatorInfo = createStore<CalculatorResponse | null>(null)
  .on(openModal, (_, calculator) => calculator)
  .reset(closeModal);

const $isModalOpen = $calculatorInfo.map(Boolean);

const checkCalculator = createEvent<CheckCalculatorFormik>();
const checkCalculatorFx = createEffect<
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
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
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
