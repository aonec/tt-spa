import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { PipeNodeResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { fetchChangeCommercialStatus } from './changeNodeStatusService.api';
import {
  ChangeNodeStatusFormPayload,
  ChangeNodeStatusPayload,
} from './changeNodeStatusService.types';
import { getChangeNodeStatusPayload } from './changeNodeStatusService.utils';

const openModal = createEvent<PipeNodeResponse>();
const closeModal = createEvent();

const $node = createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);

const $isOpen = $node.map((node) => Boolean(node));

const changeNodeStatus = createEvent<ChangeNodeStatusFormPayload>();
const changeNodeStatusFx = createEffect<
  ChangeNodeStatusPayload,
  void,
  EffectFailDataAxiosError
>(fetchChangeCommercialStatus);

changeNodeStatusFx.doneData.watch(() =>
  message.success('Статус успешно изменён'),
);

changeNodeStatusFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

sample({
  clock: changeNodeStatusFx.doneData,
  target: closeModal,
});

const $nodeId = $node.map((node) => node?.id || null);

sample({
  source: $nodeId,
  filter: Boolean,
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
