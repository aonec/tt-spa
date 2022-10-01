import React, { FC } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { Comment } from './view/Comment';

export const CommentContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  function handleCommentChange(comment: string) {
    handleChange({ comment });
  }

  return <Comment handleCommentChange={handleCommentChange} />;
};
