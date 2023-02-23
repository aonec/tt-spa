import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { PipeNodeResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { fetchChangeCommercialStatus } from './changeNodeStatusService.api';
import {
  ChangeNodeStatusFormPayload,
  ChangeNodeStatusPayload,
} from './changeNodeStatusService.types';
import { getChangeNodeStatusPayload } from './changeNodeStatusService.utils';

const domain = createDomain('changeNodeStatusService');

const openModal = domain.createEvent<PipeNodeResponse>();
const closeModal = domain.createEvent();

const $node = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);

const $isOpen = $node.map((node) => Boolean(node));

const changeNodeStatus = domain.createEvent<ChangeNodeStatusFormPayload>();
const changeNodeStatusFx = domain.createEffect<
  ChangeNodeStatusPayload,
  void,
  EffectFailDataAxiosError
>(fetchChangeCommercialStatus);

changeNodeStatusFx.doneData.watch(() =>
  message.success('Статус успешно изменён')
);

changeNodeStatusFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

forward({
  from: changeNodeStatusFx.doneData,
  to: closeModal,
});

sample({
  source: guard({
    source: $node.map((node) => node?.id),
    filter: Boolean,
  }),
  clock: changeNodeStatus,
  fn: (nodeId, payload) => ({
    nodeId,
    ...getChangeNodeStatusPayload(payload),
  }),
  target: changeNodeStatusFx,
});

export const changeNodeStatusService = {
  inputs: {
    closeModal,
    openModal,
    changeNodeStatus,
    changeNodeStatusFx,
  },
  outputs: {
    $node,
    $isOpen,
  },
};
