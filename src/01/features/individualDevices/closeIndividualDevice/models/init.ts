import { closeIndividualDevice } from './../../../../_api/individualDevices';
import { forward, sample, combine } from 'effector';
import {
  closingIndividualDeviceButtonClicked,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceFx,
  closeIndividualDeviceForm,
  isClosingIndividualDeviceRequstSuccessfull,
} from './index';
import { $closingIndividualDeviceId } from '.';

closeIndividualDeviceFx.use(closeIndividualDevice);

$closingIndividualDeviceId
  .on(closingIndividualDeviceButtonClicked, (_, id) => id)
  .reset(
    closeClosingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData
  );

forward({
  from: closeClosingIndividualDeviceModalButtonClicked,
  to: closeIndividualDeviceForm.resetValues,
});

sample({
  source: combine(
    closeIndividualDeviceForm.$values.map((values) => ({
      ...values,
      documentIds: values.documentIds.map((file) => file.fileResponse?.id!),
    })),
    $closingIndividualDeviceId,
    (props, deviceId) => ({
      ...props,
      deviceId: deviceId!,
      closingDate: props.clousingDate!,
    })
  ),
  clock: closeIndividualDeviceForm.formValidated,
  target: closeIndividualDeviceFx as any,
});

isClosingIndividualDeviceRequstSuccessfull
  .on(closeIndividualDeviceFx.doneData, () => true)
  .reset(closeClosingIndividualDeviceModalButtonClicked);
