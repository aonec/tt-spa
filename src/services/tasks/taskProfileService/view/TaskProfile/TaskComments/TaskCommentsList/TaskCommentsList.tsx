import React, { FC } from 'react';
import { Wrapper } from './TaskCommentsList.styled';
import { TaskCommentsListProps } from './TaskCommentsList.types';
import { TaskCommentContainer } from '../taskCommentService';
import { useParams } from 'react-router-dom';

export const TaskCommentsList: FC<TaskCommentsListProps> = ({ comments }) => {
  const { taskId } = useParams<{ taskId: string }>();

  const commentsList = comments.map((comment) => (
    <TaskCommentContainer key={comment.id} comment={comment} taskId={taskId} />
  ));

  return <Wrapper>{commentsList}</Wrapper>;
};
