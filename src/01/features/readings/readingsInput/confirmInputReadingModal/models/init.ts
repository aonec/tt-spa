import { executeConfirmReadingCallback } from './index';
import {
  $onConfirmReadingInputCallback,
  closeConfirmReadingCallbackModal,
  openConfirmReadingModal,
} from '.';

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
