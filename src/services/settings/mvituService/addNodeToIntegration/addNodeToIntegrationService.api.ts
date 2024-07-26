import { createMutation, createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { SearchNodeParams } from './addNodeToIntegrationService.types';
import {
  AddNodeRequest,
  NodeResponse,
  NodeSearchResponse,
} from 'api/mvitu.types';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const searchNodesQuery = createQuery<
  SearchNodeParams,
  NodeSearchResponse
>({
  handler: (params): Promise<NodeSearchResponse> =>
    axios.get('mvitu/Searching/Nodes', { params }),
});

export const getNodeQuery = createQuery<number, NodeResponse>({
  handler: (id) => axios.get(`mvitu/Searching/Nodes/${id}`),
});

export const addNodeToIntegrationMutation = createMutation({
  effect: createEffect<AddNodeRequest, void, EffectFailDataAxiosError>(
    (payload): Promise<void> => axios.post('mvitu/Nodes', payload),
  ),
});
