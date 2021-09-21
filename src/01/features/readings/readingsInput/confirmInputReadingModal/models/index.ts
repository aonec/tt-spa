import { ReactNode } from 'react';
import { createEvent, createStore } from 'effector';

interface Payload {
  callback(): void;
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

export const closeConfirmReadingCallbackModal = createEvent();
