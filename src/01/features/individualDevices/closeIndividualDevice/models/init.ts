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
  to: [
    refetchIndividualDevices,
    apartmentIndividualDevicesMetersService.inputs.refetchIndividualDevices,
  ],
});

sample({
  source: combine(
    closeIndividualDeviceForm.$values.map((values) => ({
      closingDate: values.closingDate,
      closingReason: values.closingReason,
      documentsIds: values.documentIds.map((file) => file.fileResponse?.id!),
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
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

$isClosingIndividualDeviceRequstSuccessfull
  .on(closeIndividualDeviceFx.doneData, () => true)
  .reset(closeClosingIndividualDeviceModalButtonClicked);
