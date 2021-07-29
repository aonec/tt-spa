import { forward } from 'effector';
import {
  closingIndividualDeviceButtonClicked,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceFx,
  closeIndividualDeviceForm,
} from './index';
import { $closingIndividualDeviceId } from '.';

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
