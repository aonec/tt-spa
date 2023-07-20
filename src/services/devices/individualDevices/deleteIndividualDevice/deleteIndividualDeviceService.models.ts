import { createDomain, sample } from 'effector';
import { IndividualDeviceListItemResponse } from 'api/myApi';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { message } from 'antd';
import { deleteIndividualDeviceMutation } from './deleteIndividualDeviceService.api';

const domain = createDomain('deleteIndividualDeviceService');

const deleteIndividualDevice = domain.createEvent();

const individualDeviceDeleted = deleteIndividualDeviceMutation.finished.success;

const openModal = domain.createEvent<IndividualDeviceListItemResponse>();
const closeModal = domain.createEvent();
const $currentIndividualDevice = domain
  .createStore<IndividualDeviceListItemResponse | null>(null)
  .on(openModal, (_, device) => device)
  .reset(closeModal, individualDeviceDeleted);

const $isModalOpen = $currentIndividualDevice.map(Boolean);

sample({
  clock: individualDeviceDeleted,
  target:
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

sample({
  source: $currentIndividualDevice.map((device) => device?.id),
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
