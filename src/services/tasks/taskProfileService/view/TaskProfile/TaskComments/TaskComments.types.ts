import { TaskCommentResponse } from 'api/myApi';

export type TaskCommentsProps = {
  comments: TaskCommentResponse[];
  handleAddComment: () => void;
  handleSetComment: (comment: string) => void;
  isPerpetrator: boolean;
  commentText: string;
};
