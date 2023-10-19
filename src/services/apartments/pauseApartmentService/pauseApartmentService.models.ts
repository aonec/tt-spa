import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from 'effector';
import { createGate } from 'effector-react';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import {
  EApartmentStatus,
  IndividualDeviceWithExpiredCheckingDateListResponse,
} from 'api/types';
import { SetApartmentStatusRequest } from './pauseApartmentService.types';
import { apartmentService } from '../apartmentService';
import { apartmentProblemDevicesService } from '../apartmentProblemDevicesService';
import { setApartmentStatus } from './pauseApartmentService.api';

const PauseApartmentGate = createGate<{ id: number }>();

const pauseApartmentButtonClicked = createEvent();
const pauseApartmentModalCancelButtonClicked = createEvent();
const cancelPauseApartmentButtonClicked = createEvent();

const pauseApartmentStatusFx = createEffect<
  SetApartmentStatusRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  EffectFailDataAxiosError
>(setApartmentStatus);

const pauseApartment = createEvent<SetApartmentStatusRequest>();

const $isPauseApartmentModalVisible = createStore(false)
  .on(pauseApartmentButtonClicked, () => true)
  .reset(
    pauseApartmentModalCancelButtonClicked,
    pauseApartmentStatusFx.doneData,
  );

forward({
  from: pauseApartmentStatusFx.done,
  to: apartmentService.inputs.refetchApartment,
});

forward({
  from: [
    pauseApartmentStatusFx.doneData,
    pauseApartmentModalCancelButtonClicked,
  ],
  to: apartmentProblemDevicesService.inputs.handleResetProblemDevices,
});

forward({
  from: pauseApartment,
  to: pauseApartmentStatusFx,
});

sample({
  clock: cancelPauseApartmentButtonClicked,
  source: PauseApartmentGate.state,
  fn: (source) => ({
    apartmentId: source.id,
    requestPayload: {
      fromDate: null,
      toDate: null,
      status: EApartmentStatus.Ok,
    },
  }),
  target: pauseApartmentStatusFx,
});

pauseApartmentStatusFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

const $isLoading = pauseApartmentStatusFx.pending;

const $filteredProblemDevices =
  apartmentProblemDevicesService.outputs.$problemDevices.map((devices) => {
    if (!devices) return [];

    return devices.filter((device) => {
      return !Boolean(device.closingDate);
    });
  });

export const pauseApartmentService = {
  inputs: {
    pauseApartmentModalCancelButtonClicked,
    pauseApartmentButtonClicked,
    cancelPauseApartmentButtonClicked,
    pauseApartmentStatusFx,
    pauseApartment,
  },
  outputs: {
    $isPauseApartmentModalVisible,
    $isLoading,
    $problemDevices: $filteredProblemDevices,
  },
  gates: {
    ProblemDevicesGate: apartmentProblemDevicesService.gates.ProblemDevicesGate,
    PauseApartmentGate,
  },
};
