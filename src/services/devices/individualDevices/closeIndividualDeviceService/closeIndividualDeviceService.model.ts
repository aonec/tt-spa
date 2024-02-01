import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  EClosingReason,
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';
import {
  closeIndivididualDeviceMutation,
  getLastReading,
} from './closeIndividualDeviceService.api';
import { message } from 'antd';
import { createForm } from 'effector-forms';
import dayjs from 'api/dayjs';
import { Document } from 'ui-kit/DocumentsService';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { prepareDeviceReadings } from '../workWithIndividualDeviceService/workWithIndividualDeviceService.utils';
import { PreparedForFormReadings } from '../workWithIndividualDeviceService/workWithIndividualDeviceService.types';

const closeModal = createEvent();
const openModal = createEvent<IndividualDeviceListItemResponse>();

const getLastReadingFx = createEffect<
  string,
  IndividualDeviceReadingsSlimResponse
>(getLastReading);

const $closingDevice = createStore<IndividualDeviceListItemResponse | null>(
  null,
)
  .on(openModal, (_, device) => device)
  .reset(closeModal);

const $isOpen = $closingDevice.map(Boolean);

const $lastReading = createStore<IndividualDeviceReadingsSlimResponse | null>(
  null,
).on(getLastReadingFx.doneData, (_, reading) => reading);

const closeIndividualDeviceForm = createForm({
  fields: {
    closingDate: {
      init: dayjs() as dayjs.Dayjs | null,
      rules: [
        {
          name: 'required',
          errorText: 'Это поле обязательно',
          validator: Boolean,
        },
      ],
    },
    closingReason: {
      init: null as EClosingReason | null,
      rules: [
        {
          name: 'required',
          errorText: 'Это поле обязательно',
          validator: Boolean,
        },
      ],
    },
    deviceReadings: {
      init: prepareDeviceReadings([]) as {
        [key: number]: PreparedForFormReadings;
      },
    },
    documentsIds: { init: [] as Document[] },
  },
});

sample({
  clock: closeIndivididualDeviceMutation.finished.success,
  target: closeModal,
});

sample({
  source: $closingDevice,
  clock: closeIndividualDeviceForm.formValidated,
  filter: Boolean,
  fn: ({ id }, form) => ({
    deviceId: id,
    closingMonth: form.closingDate
      ? form.closingDate?.month() + 1
      : dayjs().month() + 1,
    closingYear: form.closingDate?.year(),
    closingReason: form.closingReason,
    documentsIds: form.documentsIds.map((document) => document.id),
  }),
  target: closeIndivididualDeviceMutation.start,
});

sample({
  clock: closeIndivididualDeviceMutation.finished.success,
  target:
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

sample({
  clock: closeModal,
  target: closeIndividualDeviceForm.reset,
});

sample({
  clock: openModal,
  filter: (device) => Boolean(device?.id),
  fn: (device) => String(device?.id),
  target: getLastReadingFx,
});

closeIndivididualDeviceMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

closeIndivididualDeviceMutation.finished.success.watch(() =>
  message.success('Прибор успешно закрыт!'),
);

export const closeIndividualDeviceService = {
  inputs: { closeModal, openModal },
  outputs: {
    $isOpen,
    $closingDevice,
    $isLoading: closeIndivididualDeviceMutation.$pending,
    $lastReading,
  },
  forms: { closeIndividualDeviceForm },
};
