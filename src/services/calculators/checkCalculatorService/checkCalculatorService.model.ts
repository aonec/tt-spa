import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import moment from 'moment';
import { CalculatorResponse, CheckDeviceRequest } from 'myApi';
import { calculatorProfileService } from '../calculatorProfileService';
import { fetchCloseCalculator } from './checkCalculatorService.api';
import { CheckCalculatorFormik } from './checkCalculatorService.types';

const domain = createDomain('checkCalculatorService');

const openModal = domain.createEvent<CalculatorResponse>();
const closeModal = domain.createEvent();

const $calculatorInfo = domain
  .createStore<CalculatorResponse | null>(null)
  .on(openModal, (_, calculator) => calculator)
  .reset(closeModal);

const $isModalOpen = $calculatorInfo.map(Boolean);

const checkCalculator = domain.createEvent<CheckCalculatorFormik>();
const checkCalculatorFx = domain.createEffect<CheckDeviceRequest, void>(
  fetchCloseCalculator,
);

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

checkCalculatorFx.done.watch(() => {
  message.success('Вычислитель успешно поверен');
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
