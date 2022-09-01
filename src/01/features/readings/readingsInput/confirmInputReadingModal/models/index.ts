import { ReactNode } from 'react';
import { createEvent, createStore } from 'effector';
import { createGate } from 'effector-react';

interface Payload {
  onSubmit(): void;
  onCancel?: () => void;
  title: string | ReactNode;
}

export const $onConfirmReadingInputCallback = createStore<Payload | null>(null);

export const $isConfirmReadingInputModalOpen = $onConfirmReadingInputCallback.map(
  Boolean
);

export const $confirmModalTitle = $onConfirmReadingInputCallback.map(
  (state) => state?.title
);

export const openConfirmReadingModal = createEvent<Payload>();

export const executeConfirmReadingCallback = createEvent();

export const closeConfirmReadingModal = createEvent();

export const executeCancelReadingCallback = createEvent();

export const CancelSwitchInputGate = createGate();

export const $isCancelSwitchInput = createStore<boolean>(false);
