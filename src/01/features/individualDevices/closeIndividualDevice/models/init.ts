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
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';
import { message } from 'antd';

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
  to: apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
});

sample({
  source: combine(
    closeIndividualDeviceForm.$values.map((values) => ({
      closingDate: values.closingDate,
      closingReason: values.closingReason,
      documentsIds: values.documentIds.map((document) => document.id),
    })),
    $closingIndividualDevice,
    (props, device) => {
      return {
        deviceId: device?.id!,
        requestBody: props as CloseIndividualDeviceRequestBody,
      };
    },
  ),
  clock: closeIndividualDeviceForm.formValidated,
  target: closeIndividualDeviceFx,
});

closeIndividualDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

$isClosingIndividualDeviceRequstSuccessfull
  .on(closeIndividualDeviceFx.doneData, () => true)
  .reset(closeClosingIndividualDeviceModalButtonClicked);
