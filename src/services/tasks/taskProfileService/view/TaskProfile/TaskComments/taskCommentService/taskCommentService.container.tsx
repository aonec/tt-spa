import React, { FC } from 'react';
import { Comment } from './view/Comment';
import { TaskCommentContainerProps } from './taskCommentService.types';
import { taskCommentService } from './taskCommentService.model';
import { useEvent } from 'effector-react';

const { inputs } = taskCommentService;

export const TaskCommentContainer: FC<TaskCommentContainerProps> = ({
  comment,
  taskId,
}) => {
  const taskIdNumber = Number(taskId);
  const handleDelete = useEvent(inputs.handleDelete);
  const handleUpdate = useEvent(inputs.handleUpdate);

  return (
    <>
      <Comment
        comment={comment}
        handleDelete={handleDelete}
        taskIdNumber={taskIdNumber}
        handleUpdate={handleUpdate}
      />
    </>
  );
};
