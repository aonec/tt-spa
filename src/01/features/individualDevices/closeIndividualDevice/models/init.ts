import {
  CloseIndividualDeviceRequestBody,
  closeIndividualDevice,
} from './../../../../_api/individualDevices';
import { forward, sample, combine } from 'effector';
import {
  closingIndividualDeviceButtonClicked,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceFx,
  closeIndividualDeviceForm,
  $isClosingIndividualDeviceRequstSuccessfull,
} from './index';
import { $closingIndividualDevice } from '.';
import { refetchIndividualDevices } from '../../displayIndividualDevices/models';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';

closeIndividualDeviceFx.use(closeIndividualDevice);

$closingIndividualDevice
  .on(closingIndividualDeviceButtonClicked, (_, id) => id)
  .reset(
    closeClosingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData,
  );

forward({
  from: [
    closeClosingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData,
  ],
  to: closeIndividualDeviceForm.resetValues,
});

forward({
  from: closeIndividualDeviceFx.doneData,
  to: [
    refetchIndividualDevices,
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
  ],
});

sample({
  source: combine(
    closeIndividualDeviceForm.$values.map((values) => ({
      closingDate: values.closingDate,
      documentsIds: values.documentIds.map((file) => file.fileResponse?.id!),
    })),
    $closingIndividualDevice,
    (props, device) => ({
      params: {
        deviceId: device?.id!,
        requestBody: props as CloseIndividualDeviceRequestBody,
      },
    }),
  ),
  clock: closeIndividualDeviceForm.formValidated,
  target: closeIndividualDeviceFx as any,
});

$isClosingIndividualDeviceRequstSuccessfull
  .on(closeIndividualDeviceFx.doneData, () => true)
  .reset(closeClosingIndividualDeviceModalButtonClicked);
