import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { UpdateNodeCheckRequest } from 'api/types';
import { fetchUpdateNodeCheck } from './editNodeCheckService.api';
import { message } from 'antd';
import {
  NodeCheckInfo,
  UpdateNodeCheckPayload,
} from './editNodeCheckService.types';

const openModal = createEvent<NodeCheckInfo>();
const closeModal = createEvent();

const $updateNodePayload = createStore<NodeCheckInfo | null>(null)
  .on(openModal, (_, nodeCheck) => nodeCheck)
  .reset(closeModal);

const $isOpen = $updateNodePayload.map(Boolean);

const editNodeCheck = createEvent<UpdateNodeCheckRequest>();
const editNodeCheckFx = createEffect<UpdateNodeCheckPayload, void>(
  fetchUpdateNodeCheck,
);

const $isLoading = editNodeCheckFx.pending;
const nodeCheckEdited = editNodeCheckFx.doneData;

sample({
  source: $updateNodePayload,
  filter: Boolean,
  clock: editNodeCheck,
  fn: (source, clock) => ({
    nodeId: source.nodeId,
    checkId: source.id,
    ...clock,
  }),
  target: editNodeCheckFx,
});

sample({
  clock: nodeCheckEdited,
  target: closeModal,
});

editNodeCheckFx.doneData.watch(() =>
  message.success('Проверка успешно сохранена!'),
);
editNodeCheckFx.failData.watch(() =>
  message.error('Ошибка при сохранении проверки'),
);

export const editNodeCheckService = {
  inputs: {
    openModal,
    closeModal,
    editNodeCheck,
    nodeCheckEdited,
  },
  outputs: {
    $updateNodePayload,
    $isOpen,
    $isLoading,
  },
};
