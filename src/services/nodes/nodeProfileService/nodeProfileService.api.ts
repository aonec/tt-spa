import { createQuery } from '@farfetched/core';
import axios from 'api/axios';
import { PipeNodeResponse } from 'api/types';

export const getPipeNodeQuery = createQuery<
  [{ pipeNodeId: number }],
  PipeNodeResponse | null
>({
  handler: ({ pipeNodeId }) => axios.get(`PipeNodes/${pipeNodeId}`),
});
