import {
  closingIndividualDeviceButtonClicked,
  closeClosingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceFx,
} from './index';
import { $closingIndividualDeviceId } from '.';

$closingIndividualDeviceId
  .on(closingIndividualDeviceButtonClicked, (_, id) => id)
  .reset(
    closeClosingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData
  );
