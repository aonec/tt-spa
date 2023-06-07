import {
  combine,
  createDomain,
  createEffect,
  createEvent,
  forward,
  sample,
} from 'effector';
import { createForm } from 'effector-forms/dist';
import { createGate } from 'effector-react';
import moment from 'moment';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';
import {
  EApartmentStatus,
  IndividualDeviceWithExpiredCheckingDateListResponse,
} from 'myApi';
import { Document } from 'ui-kit/DocumentsService';
import { SetApartmentStatusRequest } from './pauseApartmentService.types';
import { apartmentService } from '../apartmentService';
import { apartmentProblemDevicesService } from '../apartmentProblemDevicesService';

const domain = createDomain('pauseApartmentService');

const PauseApartmentGate = createGate<{ id: number }>();

const pauseApartmentForm = createForm({
  fields: {
    fromDate: {
      init: moment().toISOString(true) as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    toDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    documents: {
      init: [] as Document[],
    },
  },
});

const pauseApartmentButtonClicked = createEvent();
const pauseApartmentModalCancelButtonClicked = createEvent();
const cancelPauseApartmentButtonClicked = createEvent();

const pauseApartmentStatusFx = createEffect<
  SetApartmentStatusRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  EffectFailDataAxiosError
>();

const $isPauseApartmentModalVisible = domain
  .createStore(false)
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
  to: [
    pauseApartmentForm.reset,
    apartmentProblemDevicesService.inputs.handleResetProblemDevices,
  ],
});

const payload = combine(
  PauseApartmentGate.state,
  pauseApartmentForm.$values,
  ({ id }, values) => ({
    apartmentId: id,
    requestPayload: {
      fromDate: moment(values.fromDate).format('YYYY-MM-DD'),
      toDate: moment(values.toDate).format('YYYY-MM-DD'),
      status: EApartmentStatus.Pause,
      documentIds: values.documents
        .map((document) => document.id)
        .filter((documentId): documentId is number => Boolean(documentId)),
    },
  }),
);

sample({
  clock: pauseApartmentForm.formValidated,
  source: payload,
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
  },
  outputs: {
    $isPauseApartmentModalVisible,
    pauseApartmentForm,
    $isLoading,
    $problemDevices: $filteredProblemDevices,
  },
  gates: {
    ProblemDevicesGate: apartmentProblemDevicesService.gates.ProblemDevicesGate,
    PauseApartmentGate,
  },
};
