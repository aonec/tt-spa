import { combine, createDomain, sample } from 'effector';
import { fetchCreateCalculator } from './createCalculatorModalService.api';
import { CreateCalculatorRequest, MeteringDeviceResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { CreateCalculatorPayload } from './view/CreateCalculatorModal/CreateCalculatorModal.types';
import { calculatorsListService } from 'services/calculators/calculatorsListService';

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
  .on(goPrevStep, (step) => {
    if (step > 1) {
      return step - 1;
    }
    return step;
  })
  .reset(closeModal);

const createCalculatorFx = domain.createEffect<
  CreateCalculatorRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(fetchCreateCalculator);

const calculatorCreated = createCalculatorFx.doneData;
const $isLoading = createCalculatorFx.pending;

const updateRequestPayload = domain.createEvent<CreateCalculatorPayload>();
const $requestPayload = domain
  .createStore<CreateCalculatorPayload>({
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
