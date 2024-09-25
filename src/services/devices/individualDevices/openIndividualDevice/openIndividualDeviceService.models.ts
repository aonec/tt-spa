import { IndividualDeviceListItemResponse } from 'api/types';
import { createEvent, createStore, sample } from 'effector';
import { reopenIndividualDeviceMutation } from './openIndividualDeviceService.api';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { message } from 'antd';

const openModal = createEvent<IndividualDeviceListItemResponse>();
const closeModal = createEvent();

const $individualDevice = createStore<IndividualDeviceListItemResponse | null>(
  null,
)
  .on(openModal, (_, device) => device)
  .reset(closeModal, reopenIndividualDeviceMutation.finished.success);

sample({
  clock: reopenIndividualDeviceMutation.finished.success,
  target:
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

reopenIndividualDeviceMutation.finished.success.watch(() =>
  message.success('Прибор переоткрыт!'),
);

reopenIndividualDeviceMutation.finished.failure.watch((e) => {
  const error = e.error.response.data.error;
  message.error(error.Text || error.Message);
});

export const openIndividualDeviceService = {
  inputs: { openModal, closeModal },
  outputs: { $individualDevice },
};
