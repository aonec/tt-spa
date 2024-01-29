import { Contract } from '@farfetched/core';
import { createQueryWithAuth } from 'api/farfetched';
import {
  PipeNodeResponse,
  PipeNodeResponseSuccessApiResponse,
} from 'api/types';

const PipeNodeContract: Contract<unknown, PipeNodeResponseSuccessApiResponse> =
  {
    isData: (res): res is PipeNodeResponseSuccessApiResponse => Boolean(res),
    getErrorMessages: () => ['Invalid data'],
  };

export const getPipeNodeQuery = createQueryWithAuth<
  { pipeNodeId: number },
  PipeNodeResponse | null
>({
  url: ({ pipeNodeId }) => `PipeNodes/${pipeNodeId}`,
  response: {
    contract: PipeNodeContract,
  },
});
