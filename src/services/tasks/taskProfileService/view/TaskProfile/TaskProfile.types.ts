import { TaskResponse } from 'myApi';

export type TaskProfileProps = {
  task: TaskResponse;
  isPerpetrator: boolean;
  isLoading: boolean;
  handleAddComment: () => void;
  handleSetComment: (comment: string) => void;
  commentText: string;
};
