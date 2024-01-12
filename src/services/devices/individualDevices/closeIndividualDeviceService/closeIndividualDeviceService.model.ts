import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { EClosingReason, IndividualDeviceListItemResponse } from 'api/types';
import { closeIndivididualDeviceMutation } from './closeIndividualDeviceService.api';
import { message } from 'antd';
import { createForm } from 'effector-forms';
import dayjs from 'api/dayjs';
import { Document } from 'ui-kit/DocumentsService';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';

const closeModal = createEvent();
const openModal = createEvent<IndividualDeviceListItemResponse>();

const $closingDevice = createStore<IndividualDeviceListItemResponse | null>(
  null,
)
  .on(openModal, (_, device) => device)
  .reset(closeModal);

const $isOpen = $closingDevice.map(Boolean);

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
  },
  forms: { closeIndividualDeviceForm },
};
