import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { SearchNodeParams } from './addNodeToIntegrationService.types';
import { NodeResponse, NodeSearchResponse } from 'api/mvitu.types';

export const searchNodesQuery = createQuery<
  SearchNodeParams,
  NodeSearchResponse
>({
  handler: (params): Promise<NodeSearchResponse> =>
    axios.get('/mvitu/Searching/Nodes', { params }),
});

export const getNodeQuery = createQuery<number, NodeResponse>({
  handler: (id) => axios.get(`/mvitu/Searching/Nodes/${id}`),
});
