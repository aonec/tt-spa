import { createDomain, sample } from 'effector';
import { NodeCheckResponse, UpdateNodeCheckRequest } from 'myApi';
import { fetchUpdateNodeCheck } from './editNodeCheckService.api';
import { message } from 'antd';
import { UpdateNodeCheckPayload } from './editNodeCheckService.types';

const domain = createDomain('editNodeCheckService');

const openModal = domain.createEvent<
  {
    nodeId: number;
  } & NodeCheckResponse
>();
const closeModal = domain.createEvent();

const $updateNodePayload = domain
  .createStore<
    | ({
        nodeId: number;
      } & NodeCheckResponse)
    | null
  >(null)
  .on(openModal, (_, nodeCheck) => nodeCheck)
  .reset(closeModal);

const $isOpen = $updateNodePayload.map(Boolean);

const editNodeCheck = domain.createEvent<UpdateNodeCheckRequest>();
const editNodeCheckFx = domain.createEffect<UpdateNodeCheckPayload, void>(
  fetchUpdateNodeCheck,
);

const $isLoading = editNodeCheckFx.pending;
const nodeCheckEdited = editNodeCheckFx.doneData;

sample({
  source: sample({
    source: $updateNodePayload,
    filter: Boolean,
  }),
  clock: editNodeCheck,
  fn: (source, clock) => ({ nodeId: source.nodeId, ...clock }),
  target: editNodeCheckFx,
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
