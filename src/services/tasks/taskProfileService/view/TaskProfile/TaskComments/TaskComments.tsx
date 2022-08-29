import React, { FC, useMemo } from 'react';
import { UserIcon } from 'ui-kit/icons';
import { Comment } from './Comment';
import {
  CommentInputWrapper,
  IconWrapper,
  InputSC,
  TitleWrapper,
  Wrapper,
} from './TaskComments.styled';
import { TaskCommentsProps } from './TaskComments.types';

export const TaskComments: FC<TaskCommentsProps> = ({ comments }) => {
  const commentsList = useMemo(
    () =>
      comments.map((comment) => <Comment key={comment.id} comment={comment} />),
    [comments]
  );

  return (
    <Wrapper>
      <TitleWrapper>Комментарии к задаче</TitleWrapper>
      <CommentInputWrapper>
        <IconWrapper>
          <UserIcon />
        </IconWrapper>
        <InputSC />
      </CommentInputWrapper>
    </Wrapper>
  );
};
