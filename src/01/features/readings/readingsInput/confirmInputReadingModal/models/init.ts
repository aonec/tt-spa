import {
  $isCancelSwitchInput,
  executeConfirmReadingCallback,
  CancelSwitchInputGate,
} from './index';
import {
  $onConfirmReadingInputCallback,
  closeConfirmReadingCallbackModal,
  openConfirmReadingModal,
} from '.';
import { forward } from 'effector';

$onConfirmReadingInputCallback
  .on(openConfirmReadingModal, (_, payload) => payload)
  .reset(closeConfirmReadingCallbackModal);

executeConfirmReadingCallback.watch(() => {
  const payload = $onConfirmReadingInputCallback.getState();

  if (!payload) return;

  const { callback } = payload;

  callback();
  closeConfirmReadingCallbackModal();
});

$isCancelSwitchInput
  .on(CancelSwitchInputGate.open, () => true)
  .reset(CancelSwitchInputGate.close);
