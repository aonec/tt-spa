import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { NodeSetRegistrationTypeRequest, PipeNodeResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { fetchChangeNodeType } from './changeNodeTypeService.api';
import { ChangeNodeTypePayload } from './changeNodeTypeService.types';

const openModal = createEvent<PipeNodeResponse>();
const closeModal = createEvent();

const $node = createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);

const $isOpen = $node.map((node) => Boolean(node));

const clearPayload = createEvent();

const setNodeTypePayload = createEvent<NodeSetRegistrationTypeRequest>();
const $changeNodeTypePayload = createStore<Partial<ChangeNodeTypePayload>>({})
  .on($node, (_, node) => ({ nodeId: node?.id }))
  .on(setNodeTypePayload, (oldData, data) => ({
    ...data,
    nodeId: oldData.nodeId,
  }))
  .reset(clearPayload);

const changeNodeTypeFx = createEffect<
  ChangeNodeTypePayload,
  void,
  EffectFailDataAxiosError
>(fetchChangeNodeType);

changeNodeTypeFx.doneData.watch(() =>
  message.success('Статус успешно изменён'),
);

changeNodeTypeFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

sample({
  clock: $node,
  filter: (node) => !node,
  target: clearPayload,
});

sample({
  clock: changeNodeTypeFx.doneData,
  target: closeModal,
});

sample({
  clock: $changeNodeTypePayload,
  filter: (payload): payload is ChangeNodeTypePayload =>
    Boolean(
      payload.nodeId &&
        payload.registrationType &&
        (payload.technicalTypeRequest || payload.commercialStatusRequest),
    ),
  target: changeNodeTypeFx,
});

export const changeNodeTypeService = {
  inputs: {
    closeModal,
    openModal,
    setNodeTypePayload,
    changeNodeTypeFx,
  },
  outputs: {
    $isOpen,
    $node,
  },
};
