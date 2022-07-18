import {
  $isCancelSwitchInput,
  executeConfirmReadingCallback,
  CancelSwitchInputGate,
  executeCancelReadingCallback,
} from './index';
import {
  $onConfirmReadingInputCallback,
  closeConfirmReadingModal,
  openConfirmReadingModal,
} from '.';

$onConfirmReadingInputCallback
  .on(openConfirmReadingModal, (_, payload) => payload)
  .reset(closeConfirmReadingModal);

executeCancelReadingCallback.watch(() => {
  const payload = $onConfirmReadingInputCallback.getState();
  const onCancel = payload?.onCancel;
  if (onCancel) {
    onCancel();
  }
  closeConfirmReadingModal();
});

executeConfirmReadingCallback.watch(() => {
  const payload = $onConfirmReadingInputCallback.getState();
  if (!payload) return;

  const { onSubmit } = payload;

  onSubmit();
  closeConfirmReadingModal();
});

$isCancelSwitchInput
  .on(CancelSwitchInputGate.open, () => true)
  .reset(CancelSwitchInputGate.close);
