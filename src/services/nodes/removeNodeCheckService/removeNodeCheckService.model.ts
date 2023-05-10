import { createDomain, sample } from 'effector';
import { removeNodeCheckPayload } from './removeNodeCheckService.types';
import { fetchRemoveNodeCheck } from './removeNodeCheckService.api';
import { message } from 'antd';

const domain = createDomain('removeNodeCheckService');

const openModal = domain.createEvent<removeNodeCheckPayload>();
const closeModal = domain.createEvent();

const $removeNodeCheckPayload = domain
  .createStore<removeNodeCheckPayload | null>(null)
  .on(openModal, (_, payload) => payload)
  .reset(closeModal);

const $isOpen = $removeNodeCheckPayload.map(Boolean);

const removeNodeCheck = domain.createEvent();
const removeNodeCheckFx = domain.createEffect<removeNodeCheckPayload, void>(
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
