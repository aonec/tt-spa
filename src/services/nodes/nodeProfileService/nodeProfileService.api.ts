import { createQuery } from 'api/farfetched';
import { PipeNodeResponse } from 'api/types';

export const getPipeNodeQuery = createQuery<
  { pipeNodeId: number },
  PipeNodeResponse | null
>({
  url: ({ pipeNodeId }) => `PipeNodes/${pipeNodeId}`,
});
