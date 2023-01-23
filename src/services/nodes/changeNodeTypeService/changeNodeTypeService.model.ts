import { nodeService } from '01/features/nodes/displayNode/models';
import { message } from 'antd';
import { createDomain, forward, guard } from 'effector';
import { NodeSetRegistrationTypeRequest, PipeNodeResponse } from 'myApi';
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

const setNodeTypePayload = domain.createEvent<NodeSetRegistrationTypeRequest>();
const $changeNodeTypePayload = $node
  .map<Partial<ChangeNodeTypePayload>>((node) => ({
    nodeId: node?.id,
  }))
  .on(setNodeTypePayload, (oldData, data) => ({
    ...data,
    nodeId: oldData.nodeId,
  }));

const changeNodeTypeFx = domain.createEffect<
  ChangeNodeTypePayload,
  void,
  EffectFailDataAxiosError
>(fetchChangeNodeType);

changeNodeTypeFx.doneData.watch(() =>
  message.success('Статус успешно изменён')
);

changeNodeTypeFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

forward({
  from: changeNodeTypeFx.doneData,
  to: [nodeService.inputs.refetchNode, closeModal],
});

guard({
  clock: $changeNodeTypePayload,
  filter: (payload): payload is ChangeNodeTypePayload =>
    Boolean(payload.nodeId && payload.registrationType),
  target: changeNodeTypeFx,
});

export const changeNodeTypeService = {
  inputs: {
    closeModal,
    openModal,
    setNodeTypePayload,
  },
  outputs: {
    $isOpen,
    $node,
  },
};
