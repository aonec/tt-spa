import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { ConfirmReadingCallbackPayload } from './confirmReadingService.types';

const openConfirmReadingModal = createEvent<ConfirmReadingCallbackPayload>();

const executeConfirmReadingCallback = createEvent();

const closeConfirmReadingModal = createEvent();

const executeCancelReadingCallback = createEvent();

const CancelSwitchInputGate = createGate();

const $isCancelSwitchInput = createStore<boolean>(false);

const $onConfirmReadingInputCallback =
  createStore<ConfirmReadingCallbackPayload | null>(null)
    .on(openConfirmReadingModal, (_, payload) => payload)
    .on(closeConfirmReadingModal, () => null);

const $isConfirmReadingInputModalOpen =
  $onConfirmReadingInputCallback.map(Boolean);

const $confirmModalTitle = $onConfirmReadingInputCallback.map(
  (state) => state?.title,
);

sample({
  clock: executeCancelReadingCallback,
  source: $onConfirmReadingInputCallback,
  filter: (payload): payload is ConfirmReadingCallbackPayload =>
    Boolean(payload?.onCancel),
  fn: (payload) => setTimeout(() => payload?.onCancel?.(), 0),
  target: closeConfirmReadingModal,
});

sample({
  clock: executeConfirmReadingCallback,
  source: $onConfirmReadingInputCallback,
  filter: (payload): payload is ConfirmReadingCallbackPayload =>
    Boolean(payload),
  fn: (payload) => {
    if (payload?.onSubmit) setTimeout(payload?.onSubmit, 0);
  },
  target: closeConfirmReadingModal,
});

$isCancelSwitchInput
  .on(CancelSwitchInputGate.open, () => true)
  .reset(CancelSwitchInputGate.close);

export const confirmReadingService = {
  inputs: {
    openConfirmReadingModal,
    closeConfirmReadingModal,
    executeConfirmReadingCallback,
    executeCancelReadingCallback,
  },
  outputs: { $isConfirmReadingInputModalOpen, $confirmModalTitle },
  gates: {
    CancelSwitchInputGate,
  },
};
