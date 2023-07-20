import { message } from 'antd';
import { createDomain, forward, guard } from 'effector';
import { NodeSetRegistrationTypeRequest, PipeNodeResponse } from 'api/myApi';
import { EffectFailDataAxiosError } from 'types';
import { fetchChangeNodeType } from './changeNodeTypeService.api';
import { ChangeNodeTypePayload } from './changeNodeTypeService.types';

const domain = createDomain('changeNodeTypeService');

const openModal = domain.createEvent<PipeNodeResponse>();
const closeModal = domain.createEvent();

const $node = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);

const $isOpen = $node.map((node) => Boolean(node));

const clearPayload = domain.createEvent();

const setNodeTypePayload = domain.createEvent<NodeSetRegistrationTypeRequest>();
const $changeNodeTypePayload = domain
  .createStore<Partial<ChangeNodeTypePayload>>({})
  .on($node, (_, node) => ({ nodeId: node?.id }))
  .on(setNodeTypePayload, (oldData, data) => ({
    ...data,
    nodeId: oldData.nodeId,
  }))
  .reset(clearPayload);

const changeNodeTypeFx = domain.createEffect<
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

guard({
  clock: $node,
  filter: (node) => !Boolean(node),
  target: clearPayload,
});

forward({
  from: changeNodeTypeFx.doneData,
  to: closeModal,
});

guard({
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
