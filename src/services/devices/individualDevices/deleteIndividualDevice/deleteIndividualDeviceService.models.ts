import { createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { IndividualDeviceListItemResponse } from 'api/types';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { message } from 'antd';
import { deleteIndividualDeviceMutation } from './deleteIndividualDeviceService.api';

const deleteIndividualDevice = createEvent();

const individualDeviceDeleted = deleteIndividualDeviceMutation.finished.success;

const openModal = createEvent<IndividualDeviceListItemResponse>();
const closeModal = createEvent();
const $currentIndividualDevice =
  createStore<IndividualDeviceListItemResponse | null>(null)
    .on(openModal, (_, device) => device)
    .reset(closeModal, individualDeviceDeleted);

const $isModalOpen = $currentIndividualDevice.map(Boolean);

sample({
  clock: individualDeviceDeleted,
  target:
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

sample({
  source: $currentIndividualDevice.map((device) => device?.id || null),
  clock: deleteIndividualDevice,
  filter: Boolean,
  target: deleteIndividualDeviceMutation.start,
});

individualDeviceDeleted.watch(() => message.success('Прибор успешно удален!'));

deleteIndividualDeviceMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const deleteIndividualDeviceService = {
  inputs: {
    openModal,
    closeModal,
    deleteIndividualDevice,
  },
  outputs: {
    $isModalOpen,
    $currentIndividualDevice,
  },
};
