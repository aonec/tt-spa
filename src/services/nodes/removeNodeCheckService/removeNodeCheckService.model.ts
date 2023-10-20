import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { removeNodeCheckPayload } from './removeNodeCheckService.types';
import { fetchRemoveNodeCheck } from './removeNodeCheckService.api';
import { message } from 'antd';

const openModal = createEvent<removeNodeCheckPayload>();
const closeModal = createEvent();

const $removeNodeCheckPayload = createStore<removeNodeCheckPayload | null>(null)
  .on(openModal, (_, payload) => payload)
  .reset(closeModal);

const $isOpen = $removeNodeCheckPayload.map(Boolean);

const removeNodeCheck = createEvent();
const removeNodeCheckFx = createEffect<removeNodeCheckPayload, void>(
  fetchRemoveNodeCheck,
);
const $isLoading = removeNodeCheckFx.pending;

const nodeCheckRemoved = removeNodeCheckFx.doneData;

sample({
  source: $removeNodeCheckPayload,
  filter: Boolean,
  clock: removeNodeCheck,
  target: removeNodeCheckFx,
});

sample({
  clock: nodeCheckRemoved,
  target: closeModal,
});

removeNodeCheckFx.doneData.watch(() =>
  message.success('Проверка успешно удалена!'),
);
removeNodeCheckFx.failData.watch(() =>
  message.error('Ошибка при удалении проверки'),
);

export const removeNodeCheckService = {
  inputs: {
    openModal,
    closeModal,
    removeNodeCheck,
    nodeCheckRemoved,
  },
  outputs: {
    $isOpen,
    $isLoading,
  },
};
