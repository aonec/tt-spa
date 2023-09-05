import {
  createDomain,
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
import { createForm } from 'effector-forms';
import moment from 'moment';
import { Document } from 'ui-kit/DocumentsService';

const domain = createDomain('pauseApartmentService');

const PauseApartmentGate = createGate<{ id: number }>();

const pauseApartmentButtonClicked = createEvent();
const pauseApartmentModalCancelButtonClicked = createEvent();
const cancelPauseApartmentButtonClicked = createEvent();

const pauseApartmentStatusFx = createEffect<
  SetApartmentStatusRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  EffectFailDataAxiosError
>(setApartmentStatus);

const pauseApartmentForm = createForm({
  fields: {
    fromDate: { init: moment().format() as string | null },
    toDate: { init: null as string | null },
    documents: { init: [] as Document[] },
  },
  validateOn: ['submit'],
});

const $isPauseApartmentModalVisible = domain
  .createStore(false)
  .on(pauseApartmentButtonClicked, () => true)
  .reset(pauseApartmentModalCancelButtonClicked);

sample({
  clock: pauseApartmentStatusFx.done,
  target: [
    apartmentService.inputs.refetchApartment,
    pauseApartmentModalCancelButtonClicked,
  ],
});

forward({
  from: [
    pauseApartmentStatusFx.doneData,
    pauseApartmentModalCancelButtonClicked,
  ],
  to: apartmentProblemDevicesService.inputs.handleResetProblemDevices,
});

sample({
  source: PauseApartmentGate.state.map(({ id }) => id),
  clock: pauseApartmentForm.formValidated,
  fn: (apartmentId, payload) => ({
    apartmentId,
    requestPayload: {
      fromDate: moment(payload.fromDate).format('YYYY-MM-DD'),
      toDate: moment(payload.toDate).format('YYYY-MM-DD'),
      status: EApartmentStatus.Pause,
      documentIds: payload.documents
        .map((document) => document.id)
        .filter((documentId): documentId is number => Boolean(documentId)),
    },
  }),
  target: pauseApartmentStatusFx,
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

sample({
  clock: pauseApartmentModalCancelButtonClicked,
  target: pauseApartmentForm.reset,
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
  forms: { pauseApartmentForm },
};
