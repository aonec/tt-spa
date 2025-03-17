import { createEvent, createStore, sample } from 'effector';
import {
  calculatorQuery,
  pingCalculatorQuery,
} from './pingCalculatorService.api';

const openModal = createEvent<number>();
const closeModal = createEvent();

const $deviceId = createStore<number | null>(null)
  .on(openModal, (_, id) => id)
  .reset(closeModal);

const $isModalOpen = $deviceId.map(Boolean);

sample({
  clock: $deviceId,
  filter: (deviceId): deviceId is number => Boolean(deviceId),
  target: calculatorQuery.start,
});

sample({
  clock: closeModal,
  target: [calculatorQuery.reset, pingCalculatorQuery.reset],
});

export const pingCalculatorService = {
  inputs: { openModal, closeModal },
  outputs: { $isModalOpen, $deviceId },
};
