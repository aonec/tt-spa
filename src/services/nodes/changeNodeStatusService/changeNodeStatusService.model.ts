import { nodeService } from '01/features/nodes/displayNode/models';
import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { ENodeCommercialAccountStatus, PipeNodeResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { fetchChangeCommercialStatus } from './changeNodeStatusService.api';
import {
  ChangeNodeStatusFormPayload,
  ChangeNodeStatusPayload,
} from './changeNodeStatusService.types';

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

changeNodeStatusFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

forward({
  from: changeNodeStatusFx.doneData,
  to: [nodeService.inputs.refetchNode, closeModal],
});

sample({
  source: guard({
    source: $node.map((node) => node?.id),
    filter: Boolean,
  }),
  clock: changeNodeStatus,
  fn: (nodeId, payload) => {
    const { commercialStatus, documentId, firstDate, secondDate } = payload;
    if (
      commercialStatus === ENodeCommercialAccountStatus.OnReview ||
      commercialStatus === ENodeCommercialAccountStatus.Prepared
    ) {
      return {
        commercialStatusChangingDate: firstDate,
        nodeId,
        commercialStatus,
      };
    }

    if (commercialStatus === ENodeCommercialAccountStatus.NotRegistered) {
      return {
        commercialAccountingDeregistrationDate: firstDate,
        nodeId,
        commercialStatus,
        documentId,
      };
    }
    return {
      nodeId,
      commercialStatus,
      documentId,
      startCommercialAccountingDate: firstDate,
      endCommercialAccountingDate: secondDate,
    };
  },
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
