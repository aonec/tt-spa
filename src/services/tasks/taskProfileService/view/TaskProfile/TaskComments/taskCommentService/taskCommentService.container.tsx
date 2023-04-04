import React, { FC } from 'react';
import { Comment } from './view/Comment';
import { TaskCommentContainerProps } from './taskCommentService.types';
import { taskCommentService } from './taskCommentService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs } = taskCommentService;

export const TaskCommentContainer: FC<TaskCommentContainerProps> = ({
  comment: commentFromTask,
  taskId,
}) => {
  const taskIdNumber = Number(taskId);
  const handleDelete = useEvent(inputs.handleDelete);
  const handleUpdate = useEvent(inputs.handleUpdate);

  const updatedCommentData = useStore(outputs.$updatedCommentData);
  const comment =
    updatedCommentData && updatedCommentData?.id === commentFromTask.id
      ? updatedCommentData
      : commentFromTask;

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
