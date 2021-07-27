import {
  closingIndividualDeviceButtonClicked,
  closeClousingIndividualDeviceModalButtonClicked,
  closeIndividualDeviceFx,
} from './index';
import { $closingIndividualDeviceId } from '.';

$closingIndividualDeviceId
  .on(closingIndividualDeviceButtonClicked, (_, id) => id)
  .reset(
    closeClousingIndividualDeviceModalButtonClicked,
    closeIndividualDeviceFx.doneData
  );
