import { PipeNodeResponse, TaskResponse } from 'myApi';

export type TaskProfileProps = {
  task: TaskResponse;
  isPerpetrator: boolean;
  handleAddComment: () => void;
  handleSetComment: (comment: string) => void;
  commentText: string;
  handleDeleteDocument: (is: number) => void;
  relatedPipeNode: PipeNodeResponse | null;
};
