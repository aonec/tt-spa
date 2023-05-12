import { createDomain, sample } from 'effector';
import { fetchCreateCalculator } from './createCalculatorModalService.api';
import { CreateCalculatorRequest, MeteringDeviceResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('createCalculatorModalService');

const openModal = domain.createEvent<number>();
const closeModal = domain.createEvent();

const $housingStockId = domain
  .createStore<number | null>(null)
  .on(openModal, (_, id) => id)
  .reset(closeModal);
const $isOpen = $housingStockId.map(Boolean);

const handleSubmitForm = domain.createEvent();

const goNextStep = domain.createEvent();
const goPrevStep = domain.createEvent();

const $stepNumber = domain
  .createStore(1)
  .on(goNextStep, (step) => step + 1)
  .on(goPrevStep, (step) => step - 1)
  .reset(closeModal);

const createCalculatorFx = domain.createEffect<
  CreateCalculatorRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(fetchCreateCalculator);

const calculatorCreated = createCalculatorFx.doneData;
const $isLoading = createCalculatorFx.pending;

const updateRequestPayload =
  domain.createEvent<Partial<CreateCalculatorRequest>>();
const $requestPayload = domain
  .createStore<Partial<CreateCalculatorRequest>>({})
  .on(updateRequestPayload, (prev, data) => ({ ...prev, ...data }))
  .reset(closeModal);

sample({
  source: $requestPayload,
  filter: (payload): payload is CreateCalculatorRequest =>
    Boolean(payload.serialNumber && payload.housingStockId && payload.infoId),
  clock: handleSubmitForm,
  target: createCalculatorFx,
});

sample({
  source: $stepNumber,
  clock: updateRequestPayload,
  filter: (stepNumber) => stepNumber < 4,
  target: goNextStep,
});

sample({
  clock: calculatorCreated,
  target: closeModal,
});

calculatorCreated.watch(() => message.success('Вычислитель успешно создан!'));

createCalculatorFx.failData.watch((e) => {
  message.error(e.response.data.error.Text);
});

export const createCalculatorModalService = {
  inputs: {
    handleSubmitForm,
    updateRequestPayload,
    goPrevStep,
    closeModal,
    openModal,
    calculatorCreated,
  },
  outputs: { $stepNumber, $isOpen, $isLoading },
};
