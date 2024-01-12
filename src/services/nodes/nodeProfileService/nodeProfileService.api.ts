import { createQueryWithAuth } from 'api/farfetched';
import { PipeNodeResponse } from 'api/types';

export const getPipeNodeQuery = createQueryWithAuth<
  { pipeNodeId: number },
  PipeNodeResponse | null
>({
  url: ({ pipeNodeId }) => `PipeNodes/${pipeNodeId}`,
});
