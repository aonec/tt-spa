import { createMutation, createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import {
  ChangeNodeStatusRequestPayload,
  GetMvituNodesRequestParams,
} from './mvituIntegrationSectionService.types';
import {
  ChangeStatusRequest,
  MvituNodeResponsePagedList,
} from 'api/mvitu.types';
import { createEffect } from 'effector';

export const mvituNodesQuery = createQuery<
  GetMvituNodesRequestParams,
  MvituNodeResponsePagedList
>({
  handler: () => axios.get('mvitu/Nodes'),
});

export const mvituIntegrationUpdateStatusMutation = createMutation({
  effect: createEffect<ChangeStatusRequest, void>(
    (data): Promise<void> =>
      axios.post('mvitu/Integrations/ChangeStatus', data),
  ),
});

export const changeNodeStatusMutation = createMutation({
  effect: createEffect<ChangeNodeStatusRequestPayload, void>(
    ({ nodeId, ...payload }): Promise<void> =>
      axios.post(`mvitu/Nodes/${nodeId}/ChangeStatus`, payload),
  ),
});
