import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { ConfirmReadingCallbackPayload } from './confirmReadingService.types';

const $onConfirmReadingInputCallback =
  createStore<ConfirmReadingCallbackPayload | null>(null);

const $isConfirmReadingInputModalOpen =
  $onConfirmReadingInputCallback.map(Boolean);

const $confirmModalTitle = $onConfirmReadingInputCallback.map(
  (state) => state?.title,
);

const openConfirmReadingModal = createEvent<ConfirmReadingCallbackPayload>();

const executeConfirmReadingCallback = createEvent();

const closeConfirmReadingModal = createEvent();

const executeCancelReadingCallback = createEvent();

const CancelSwitchInputGate = createGate();

const $isCancelSwitchInput = createStore<boolean>(false);

$onConfirmReadingInputCallback
  .on(openConfirmReadingModal, (_, payload) => payload)
  .reset(closeConfirmReadingModal);

sample({
  clock: executeCancelReadingCallback,
  source: $onConfirmReadingInputCallback,
  filter: (payload): payload is ConfirmReadingCallbackPayload =>
    Boolean(payload?.onCancel),
  fn: (payload) => payload?.onCancel?.(),
  target: closeConfirmReadingModal,
});

sample({
  clock: executeConfirmReadingCallback,
  source: $onConfirmReadingInputCallback,
  filter: (payload): payload is ConfirmReadingCallbackPayload =>
    Boolean(payload),
  fn: (payload) => payload?.onSubmit(),
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
