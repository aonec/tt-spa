import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { UpdateNodeCheckRequest } from 'api/types';
import { fetchCreateNodeCheck } from './createNodeCheckService.api';
import { CreateNodeCheckPayload } from './createNodeCheckService.types';
import { message } from 'antd';

const openModal = createEvent<number>();
const closeModal = createEvent();

const $nodeId = createStore<number | null>(null)
  .on(openModal, (_, nodeId) => nodeId)
  .reset(closeModal);

const $isOpen = $nodeId.map(Boolean);

const createNodeCheck = createEvent<UpdateNodeCheckRequest>();
const createNodeCheckFx = createEffect<CreateNodeCheckPayload, void>(
  fetchCreateNodeCheck,
);

const $isLoading = createNodeCheckFx.pending;

const nodeCheckCreated = createNodeCheckFx.doneData;

sample({
  source: $nodeId,
  clock: createNodeCheck,
  filter: (nodeId, payload) =>
    Boolean(nodeId) &&
    Boolean(
      payload?.checkType && payload?.checkingDate && payload?.registryNumber,
    ),
  fn: (nodeId, payload) => ({ ...payload, nodeId } as CreateNodeCheckPayload),
  target: createNodeCheckFx,
});

sample({
  clock: nodeCheckCreated,
  target: closeModal,
});

createNodeCheckFx.doneData.watch(() =>
  message.success('Проверка успешно добавлена!'),
);
createNodeCheckFx.failData.watch(() =>
  message.error('Ошибка при добавлении проверки'),
);

export const createNodeCheckService = {
  inputs: {
    openModal,
    closeModal,
    createNodeCheck,
    nodeCheckCreated,
  },
  outputs: {
    $isOpen,
    $isLoading,
  },
};
