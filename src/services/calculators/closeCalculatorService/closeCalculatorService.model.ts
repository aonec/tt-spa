import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { CalculatorResponse, CloseDeviceRequest } from 'api/types';
import { calculatorProfileService } from '../calculatorProfileService';
import { fetchCloseCalculator } from './closeCalculatorService.api';
import { CloseCalculatorFormik } from './closeCalculatorService.types';
import { EffectFailDataAxiosError } from 'types';

const openModal = createEvent<CalculatorResponse>();
const closeModal = createEvent();

const $calculatorInfo = createStore<CalculatorResponse | null>(null)
  .on(openModal, (_, info) => info)
  .reset(closeModal);

const $isModalOpen = $calculatorInfo.map(Boolean);

const closeCalculator = createEvent<CloseCalculatorFormik>();
const closeCalculatorFx = createEffect<
  CloseDeviceRequest,
  void,
  EffectFailDataAxiosError
>(fetchCloseCalculator);

sample({
  source: sample({
    source: $calculatorInfo,
    filter: Boolean,
  }),
  clock: closeCalculator,
  fn: ({ id }, payload) => ({ ...payload, deviceId: id }),
  target: closeCalculatorFx,
});

sample({
  clock: closeCalculatorFx.doneData,
  target: [closeModal, calculatorProfileService.inputs.refetchCalculator],
});

closeCalculatorFx.done.watch(() => {
  message.success('Вычислитель успешно закрыт');
});

closeCalculatorFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const successClose = closeCalculatorFx.done;

export const closeCalculatorService = {
  inputs: {
    closeModal,
    openModal,
    closeCalculator,
    successClose,
  },
  outputs: {
    $isModalOpen,
    $calculatorInfo,
  },
};
