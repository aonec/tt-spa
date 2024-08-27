import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { GetMvituNodesRequestParams } from './mvituIntegrationSectionService.types';
import {
  changeNodeStatusMutation,
  deleteNodeMutation,
  mvituNodesQuery,
} from './mvituIntegrationSectionService.api';
import { message } from 'antd';
import { debounce } from 'patronum';

const MvituSectionGate = createGate();

const changePageNumber = createEvent<number>();

const setSearchParams = createEvent<Partial<GetMvituNodesRequestParams>>();

const $nodesListRequestPayload = createStore<GetMvituNodesRequestParams>({
  PageSize: 5,
  PageNumber: 1,
})
  .on(changePageNumber, (prev, pageNumber) => ({
    ...prev,
    PageNumber: pageNumber,
  }))
  .on(setSearchParams, (prev, params) => {
    return { ...prev, ...params };
  });

const refetchNodesQuery = createEvent();

const $debouncedSearchParams = debounce({
  source: $nodesListRequestPayload,
  timeout: 300,
});

sample({
  source: $debouncedSearchParams,
  clock: [
    MvituSectionGate.open,
    refetchNodesQuery,
    changeNodeStatusMutation.finished.success,
    deleteNodeMutation.finished.success,
    $debouncedSearchParams,
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
  inputs: { refetchNodesQuery, changePageNumber, setSearchParams },
  outputs: { $nodesListRequestPayload },
  gates: { MvituSectionGate },
};
