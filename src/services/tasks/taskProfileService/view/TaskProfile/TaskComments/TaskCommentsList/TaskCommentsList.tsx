import React, { FC, useMemo } from 'react';
import { Comment } from '../Comment';
import { Wrapper } from './TaskCommentsList.styled';
import { TaskCommentsListProps } from './TaskCommentsList.types';

export const TaskCommentsList: FC<TaskCommentsListProps> = ({ comments }) => {
  const commentsList = comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return <Wrapper>{commentsList}</Wrapper>;
};
