import { combine, createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  IndividualDeviceListItemResponse,
  IndividualDeviceReadingsSlimResponse,
} from 'api/types';
import {
  closeIndivididualDeviceMutation,
  getLastReading,
} from './closeIndividualDeviceService.api';
import { message } from 'antd';
import dayjs from 'api/dayjs';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { readingsHistoryService } from 'services/meters/readingsHistoryService/readingsHistoryService.model';
import { CloseIndividualDeviceFormType } from './view/CloseIndividualDeviceForm/CloseIndividualDeviceForm.types';

const closeModal = createEvent();
const openModal = createEvent<IndividualDeviceListItemResponse>();

const handleSubmitForm = createEvent<CloseIndividualDeviceFormType>();
const handleSetClosingDate = createEvent<dayjs.Dayjs>();

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
)
  .on(getLastReadingFx.doneData, (_, reading) => reading)
  .reset(closeModal);

const $closingDate = createStore<dayjs.Dayjs | null>(null)
  .on(handleSetClosingDate, (_, date) => date)
  .reset(closeModal);

const $isBannerShown = combine(
  {
    closingDate: $closingDate,
    lastReading: $lastReading,
  },
  ({ closingDate, lastReading }) => {
    const lastReadingDate = dayjs(lastReading?.actualReadingDate).startOf(
      'month',
    );

    const closingDateStartOfMonth = closingDate?.startOf('month');

    const monthDiffNumber = closingDateStartOfMonth?.diff(
      lastReadingDate,
      'month',
    );

    if (monthDiffNumber === undefined) return false;

    return monthDiffNumber <= -1;
  },
);

sample({
  clock: closeIndivididualDeviceMutation.finished.success,
  target: closeModal,
});

sample({
  source: $closingDevice,
  clock: handleSubmitForm,
  filter: Boolean,
  fn: ({ id }, form) => ({
    deviceId: id,
    closingMonth: form.closingDate
      ? form.closingDate?.month() + 1
      : dayjs().month() + 1,
    closingYear: form.closingDate?.year(),
    closingReason: form.closingReason,
  }),
  target: closeIndivididualDeviceMutation.start,
});

sample({
  clock: closeIndivididualDeviceMutation.finished.success,
  target:
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

sample({
  clock: openModal,
  filter: (device) => Boolean(device?.id),
  fn: (device) => String(device.id),
  target: getLastReadingFx,
});

sample({
  clock: readingsHistoryService.inputs.closeReadingsHistoryModal,
  source: $closingDevice,
  filter: (closingDevice) => Boolean(closingDevice),
  fn: (closingDevice) => String(closingDevice?.id),
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
  inputs: { closeModal, openModal, handleSubmitForm, handleSetClosingDate },
  outputs: {
    $isOpen,
    $closingDevice,
    $isLoading: closeIndivididualDeviceMutation.$pending,
    $lastReading,
    $isBannerShown,
  },
};
