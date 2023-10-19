import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { forward, guard, sample } from 'effector';
import {
  CreatePipeHousingMeteringDeviceRequest,
  PipeNodeResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { fetchAddHousingMeteringDevice } from './addHosuingMeteringDeviceService.api';
import { EXTREAM_STEP_NUMBER } from './addHosuingMeteringDeviceService.constants';
import { CreatePipeHousingMeteringDevicePayload } from './addHosuingMeteringDeviceService.types';

const openModal = createEvent<PipeNodeResponse>();
const closeModal = createEvent();

const $pipeNode = createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);

const $isOpen = $pipeNode.map(Boolean);

const handleFormComplete = createEvent();

const createMeteringDeviceFx = createEffect<
  CreatePipeHousingMeteringDeviceRequest,
  void,
  EffectFailDataAxiosError
>(fetchAddHousingMeteringDevice);

const updateCommonDeviceRequestPayload =
  createEvent<Partial<CreatePipeHousingMeteringDevicePayload>>();
const $requestPayload =
  createStore<Partial<CreatePipeHousingMeteringDevicePayload> | null>(null)
    .on(updateCommonDeviceRequestPayload, (oldData, data) => {
      if (!oldData) {
        return { ...data };
      }
      return {
        ...oldData,
        ...data,
      };
    })
    .on($pipeNode, (payload, node) => ({ ...payload, nodeId: node?.id }))
    .reset(closeModal);

const goNextStep = createEvent();
const goPrevStep = createEvent();
const $currentFormStep = createStore<number>(0)
  .on(goNextStep, (prev) => prev + 1)
  .on(goPrevStep, (prev) => prev - 1)
  .reset(closeModal);

const deviceCreated = createMeteringDeviceFx.doneData;

deviceCreated.watch(() => message.success('Прибор успешно создан!'));

guard({
  source: $currentFormStep,
  clock: updateCommonDeviceRequestPayload,
  filter: (stepNumber) => stepNumber < EXTREAM_STEP_NUMBER,
  target: goNextStep,
});

sample({
  source: sample({
    source: $requestPayload,
    filter: (payload): payload is CreatePipeHousingMeteringDevicePayload =>
      Boolean(
        payload?.model &&
          payload?.serialNumber &&
          payload?.housingMeteringDeviceType &&
          payload.nodeId &&
          payload.pipeId,
      ),
  }),
  clock: handleFormComplete,
  fn: (payload) => ({
    ...payload,
    communicationPipeId: payload.pipeId,
  }),
  target: createMeteringDeviceFx,
});

forward({
  from: createMeteringDeviceFx.doneData,
  to: closeModal,
});

createMeteringDeviceFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

export const addHosuingMeteringDeviceService = {
  inputs: {
    openModal,
    closeModal,
    goPrevStep,
    handleFormComplete,
    updateCommonDeviceRequestPayload,
    deviceCreated,
  },
  outputs: {
    $pipeNode,
    $isOpen,
    $currentFormStep,
    $requestPayload,
  },
};
