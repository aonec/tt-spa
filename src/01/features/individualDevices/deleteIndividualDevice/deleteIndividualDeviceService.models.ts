import { createDomain, forward } from 'effector';
import { IndividualDeviceListItemResponse } from 'myApi';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { deleteDevice } from './deleteIndividualDeviceService.api';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const deleteIndividualDeviceDomain = createDomain(
  'deleteIndividualDeviceService',
);

const $currentIndividualDevice =
  deleteIndividualDeviceDomain.createStore<IndividualDeviceListItemResponse | null>(
    null,
  );

const $isModalOpen = $currentIndividualDevice.map(Boolean);

const deleteDeviceModalOpened =
  deleteIndividualDeviceDomain.createEvent<IndividualDeviceListItemResponse>();
const deleteDeviceModalClosed = deleteIndividualDeviceDomain.createEvent();

const acceptDeleteDevice = deleteIndividualDeviceDomain.createEvent();

const deleteIndividualDeviceFx = deleteIndividualDeviceDomain.createEffect<
  number,
  void,
  EffectFailDataAxiosError
>(deleteDevice);

forward({
  from: deleteIndividualDeviceFx.doneData,
  to: apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

deleteIndividualDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export const deleteIndividualDeviceService = {
  inputs: {
    deleteDeviceModalOpened,
    deleteDeviceModalClosed,
    acceptDeleteDevice,
    deleteIndividualDeviceFx,
  },
  outputs: {
    $isModalOpen,
    $currentIndividualDevice,
    $loading: deleteIndividualDeviceFx.pending,
  },
};
