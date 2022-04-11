import { createDomain } from 'effector';
import { IndividualDeviceListItemResponse } from 'myApi';
import { deleteDevice } from './deleteIndividualDeviceService.api';

const deleteIndividualDeviceDomain = createDomain(
  'deleteIndividualDeviceService'
);

const $individualDevice = deleteIndividualDeviceDomain.createStore<IndividualDeviceListItemResponse | null>(
  null
);

const $isModalOpen = $individualDevice.map(Boolean);

const deleteDeviceButtonClicked = deleteIndividualDeviceDomain.createEvent<IndividualDeviceListItemResponse>();
const closeModalButtonClicked = deleteIndividualDeviceDomain.createEvent();

const acceptDeleteDeviceButtonClicked = deleteIndividualDeviceDomain.createEvent();

const deleteIndividualDeviceFx = deleteIndividualDeviceDomain.createEffect<
  number,
  void
>(deleteDevice);

export const deleteIndividualDeviceService = {
  inputs: {
    deleteDeviceButtonClicked,
    closeModalButtonClicked,
    acceptDeleteDeviceButtonClicked,
    deleteIndividualDeviceFx,
  },
  outputs: {
    $isModalOpen,
    $individualDevice,
    $loading: deleteIndividualDeviceFx.pending,
  },
};
