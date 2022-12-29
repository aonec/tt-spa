import { nodeService } from '01/features/nodes/displayNode/models';
import { message } from 'antd';
import { createDomain, forward } from 'effector';
import { PipeNodeResponse } from 'myApi';

const domain = createDomain('changeNodeStatusService');

const openModal = domain.createEvent<PipeNodeResponse>();
const closeModal = domain.createEvent();

const $node = domain
  .createStore<PipeNodeResponse | null>(null)
  .on(openModal, (_, node) => node)
  .reset(closeModal);

const $isOpen = $node.map((node) => Boolean(node));

const changeNodeStatus = domain.createEvent();
const changeNodeStatusFx = domain.createEffect();

changeNodeStatusFx.doneData.watch(() =>
  message.success('Статус успешно изменён')
);

forward({
  from: changeNodeStatusFx.doneData,
  to: [nodeService.inputs.refetchNode, closeModal],
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
