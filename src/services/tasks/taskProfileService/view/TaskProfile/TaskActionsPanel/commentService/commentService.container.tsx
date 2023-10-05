import React, { FC, useCallback } from 'react';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { Comment } from './view/Comment';

export const CommentContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const handleCommentChange = useCallback(
    (comment: string) => {
      handleChange({ comment });
    },
    [handleChange],
  );

  return <Comment handleCommentChange={handleCommentChange} />;
};
