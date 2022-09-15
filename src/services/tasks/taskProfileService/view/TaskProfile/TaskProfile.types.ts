import { PipeNodeResponse, TaskResponse } from 'myApi';

export type TaskProfileProps = {
  task: TaskResponse;
  relatedPipeNode: PipeNodeResponse | null;
};
