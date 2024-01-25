import { createEffect, createEvent, createStore } from 'effector';
import { combine, sample } from 'effector';
import { fetchCreateCalculator } from './createCalculatorModalService.api';
import { CreateCalculatorRequest, MeteringDeviceResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { CreateCalculatorPayload } from './view/CreateCalculatorModal/CreateCalculatorModal.types';
import { calculatorsListService } from 'services/calculators/calculatorsListService';

const openModal = createEvent<number>();
const closeModal = createEvent();

const $housingStockId = createStore<number | null>(null)
  .on(openModal, (_, id) => id)
  .reset(closeModal);
const $isOpen = $housingStockId.map(Boolean);

const handleSubmitForm = createEvent();

const goNextStep = createEvent();
const goPrevStep = createEvent();

const $stepNumber = createStore(1)
  .on(goNextStep, (step) => step + 1)
  .on(goPrevStep, (step) => {
    if (step > 1) {
      return step - 1;
    }
    return step;
  })
  .reset(closeModal);

const createCalculatorFx = createEffect<
  CreateCalculatorRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(fetchCreateCalculator);

const calculatorCreated = createCalculatorFx.doneData;
const $isLoading = createCalculatorFx.pending;

const updateRequestPayload = createEvent<CreateCalculatorPayload>();
const $requestPayload = createStore<CreateCalculatorPayload>({
  isConnected: false,
})
  .on(updateRequestPayload, (prev, data) => ({ ...prev, ...data }))
  .reset(closeModal);

sample({
  source: combine(
    $requestPayload,
    $housingStockId,
    (payload, housingStockId) => ({ ...payload, housingStockId }),
  ),
  filter: (payload): payload is CreateCalculatorRequest =>
    Boolean(payload.serialNumber && payload.housingStockId && payload.infoId),
  fn: (payload) =>
    ({
      ...payload,
      documentsIds: [
        payload.deviceAcceptanceAct?.id,
        payload.devicePassport?.id,
        payload.deviceTestCertificates?.id,
      ].filter((documentId): documentId is number => Boolean(documentId)),
    } as CreateCalculatorRequest),
  clock: handleSubmitForm,
  target: createCalculatorFx,
});

sample({
  source: $stepNumber,
  clock: updateRequestPayload,
  filter: (stepNumber) => stepNumber === 3,
  target: handleSubmitForm,
});

sample({
  source: $stepNumber,
  clock: updateRequestPayload,
  filter: (stepNumber) => stepNumber < 3,
  target: goNextStep,
});

sample({
  clock: calculatorCreated,
  target: [calculatorsListService.inputs.refetchCalculators, closeModal],
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
  outputs: {
    $stepNumber,
    $isOpen,
    $isLoading,
    $requestPayload,
  },
};
