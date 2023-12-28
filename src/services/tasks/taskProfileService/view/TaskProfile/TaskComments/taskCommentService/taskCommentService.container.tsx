import React, { FC } from 'react';
import { Comment } from './view/Comment';
import { TaskCommentContainerProps } from './taskCommentService.types';
import { taskCommentService } from './taskCommentService.model';
import { useUnit } from 'effector-react';

const { inputs, outputs } = taskCommentService;

export const TaskCommentContainer: FC<TaskCommentContainerProps> = ({
  comment: commentFromTask,
  taskId,
}) => {
  const taskIdNumber = Number(taskId);
  const { handleDelete, handleUpdate, updatedCommentData } = useUnit({
    handleDelete: inputs.handleDelete,
    handleUpdate: inputs.handleUpdate,
    updatedCommentData: outputs.$updatedCommentData,
  });

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
