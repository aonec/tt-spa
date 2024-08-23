import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetMvituNodesRequestParams } from './mvituIntegrationSectionService.types';
import {
  changeNodeStatusMutation,
  deleteNodeMutation,
  mvituNodesQuery,
} from './mvituIntegrationSectionService.api';
import { message } from 'antd';

const MvituSectionGate = createGate();

const changePageNumber = createEvent<number>();

const $nodesListRequestPayload = createStore<GetMvituNodesRequestParams>({
  PageSize: 5,
  PageNumber: 1,
}).on(changePageNumber, (prev, pageNumber) => ({
  ...prev,
  PageNumber: pageNumber,
}));

const refetchNodesQuery = createEvent();

sample({
  source: $nodesListRequestPayload,
  clock: [
    MvituSectionGate.open,
    refetchNodesQuery,
    changeNodeStatusMutation.finished.success,
    deleteNodeMutation.finished.success,
    $nodesListRequestPayload.updates,
  ],
  target: mvituNodesQuery.start,
});

changeNodeStatusMutation.finished.success.watch(() =>
  message.success('Статус узла изменен'),
);

deleteNodeMutation.finished.success.watch(() =>
  message.info('Узел удален из интеграции'),
);

export const mvituIntegrationSectionService = {
  inputs: { refetchNodesQuery, changePageNumber },
  outputs: { $nodesListRequestPayload },
  gates: { MvituSectionGate },
};
