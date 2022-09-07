import { PipeNodeResponse, TaskResponse } from 'myApi';

export type TaskProfileProps = {
  task: TaskResponse;
  isLoading: boolean;
  relatedPipeNode: PipeNodeResponse | null;
};
