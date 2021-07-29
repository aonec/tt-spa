import { closeIndividualDevice } from './../../../../_api/individualDevices';
import { forward, sample, combine } from 'effector';
import {
  closingIndividualDeviceButtonClicked,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceFx,
  closeIndividualDeviceForm,
  isClosingIndividualDeviceRequstSuccessfull,
} from './index';
import { $closingIndividualDevice } from '.';

closeIndividualDeviceFx.use(closeIndividualDevice);

$closingIndividualDevice
  .on(closingIndividualDeviceButtonClicked, (_, id) => id)
  .reset(
    closeClosingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData
  );

forward({
  from: [
    closeClosingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData,
  ],
  to: closeIndividualDeviceForm.resetValues,
});

sample({
  source: combine(
    closeIndividualDeviceForm.$values.map((values) => ({
      ...values,
      documentIds: values.documentIds.map((file) => file.fileResponse?.id!),
    })),
    $closingIndividualDevice,
    (props, device) => ({
      ...props,
      deviceId: device?.id!,
      closingDate: props.clousingDate!,
    })
  ),
  clock: closeIndividualDeviceForm.formValidated,
  target: closeIndividualDeviceFx as any,
});

isClosingIndividualDeviceRequstSuccessfull
  .on(closeIndividualDeviceFx.doneData, () => true)
  .reset(closeClosingIndividualDeviceModalButtonClicked);
