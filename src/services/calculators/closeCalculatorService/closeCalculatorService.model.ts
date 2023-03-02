import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { CalculatorResponse, CloseDeviceRequest } from 'myApi';
import { calculatorProfileService } from '../calculatorProfileService';
import { fetchCloseCalculator } from './closeCalculatorService.api';
import { CloseCalculatorFormik } from './closeCalculatorService.types';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('closeCalculatorService');

const openModal = domain.createEvent<CalculatorResponse>();
const closeModal = domain.createEvent();

const $calculatorInfo = domain
  .createStore<CalculatorResponse | null>(null)
  .on(openModal, (_, info) => info)
  .reset(closeModal);

const $isModalOpen = $calculatorInfo.map(Boolean);

const closeCalculator = domain.createEvent<CloseCalculatorFormik>();
const closeCalculatorFx = domain.createEffect<
  CloseDeviceRequest,
  void,
  EffectFailDataAxiosError
>(fetchCloseCalculator);

sample({
  source: guard({
    source: $calculatorInfo,
    filter: Boolean,
  }),
  clock: closeCalculator,
  fn: ({ id }, payload) => ({ ...payload, deviceId: id }),
  target: closeCalculatorFx,
});

forward({
  from: closeCalculatorFx.doneData,
  to: [closeModal, calculatorProfileService.inputs.refetchCalculator],
});

closeCalculatorFx.done.watch(() => {
  message.success('Вычислитель успешно закрыт');
});

closeCalculatorFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const closeCalculatorService = {
  inputs: {
    closeModal,
    openModal,
    closeCalculator,
  },
  outputs: {
    $isModalOpen,
    $calculatorInfo,
  },
};
