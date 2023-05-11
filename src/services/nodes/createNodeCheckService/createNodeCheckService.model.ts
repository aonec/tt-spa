import { createDomain, sample } from 'effector';
import { CreateNodeCheckRequest, UpdateNodeCheckRequest } from 'myApi';
import { fetchCreateNodeCheck } from './createNodeCheckService.api';
import { CreateNodeCheckPayload } from './createNodeCheckService.types';
import { message } from 'antd';

const domain = createDomain('createNodeCheckService');

const openModal = domain.createEvent<number>();
const closeModal = domain.createEvent();

const $nodeId = domain
  .createStore<number | null>(null)
  .on(openModal, (_, nodeId) => nodeId)
  .reset(closeModal);

const $isOpen = $nodeId.map(Boolean);

const createNodeCheck = domain.createEvent<UpdateNodeCheckRequest>();
const createNodeCheckFx = domain.createEffect<CreateNodeCheckPayload, void>(
  fetchCreateNodeCheck,
);

const $isLoading = createNodeCheckFx.pending;

const nodeCheckCreated = createNodeCheckFx.doneData;

sample({
  source: $nodeId,
  filter: Boolean,
  clock: sample({
    clock: createNodeCheck,
    filter: (payload): payload is CreateNodeCheckRequest =>
      Boolean(
        payload?.checkType && payload?.checkingDate && payload?.registryNumber,
      ),
  }),
  fn: (nodeId, payload) => ({ ...payload, nodeId }),
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
