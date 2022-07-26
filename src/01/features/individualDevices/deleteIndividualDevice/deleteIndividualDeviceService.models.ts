import { createDomain } from 'effector';
import { IndividualDeviceListItemResponse } from '../../api/types';
import { deleteDevice } from './deleteIndividualDeviceService.api';

const deleteIndividualDeviceDomain = createDomain(
  'deleteIndividualDeviceService'
);

const $currentIndividualDevice = deleteIndividualDeviceDomain.createStore<IndividualDeviceListItemResponse | null>(
  null
);

const $isModalOpen = $currentIndividualDevice.map(Boolean);

const deleteDeviceModalOpened = deleteIndividualDeviceDomain.createEvent<IndividualDeviceListItemResponse>();
const deleteDeviceModalClosed = deleteIndividualDeviceDomain.createEvent();

const acceptDeleteDevice = deleteIndividualDeviceDomain.createEvent();

const deleteIndividualDeviceFx = deleteIndividualDeviceDomain.createEffect<
  number,
  void
>(deleteDevice);

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
