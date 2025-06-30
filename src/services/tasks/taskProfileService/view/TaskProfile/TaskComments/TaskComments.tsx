import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { UserIcon } from 'ui-kit/icons';
import {
  ButtonWrapper,
  CommentInputWrapper,
  IconWrapper,
  InputSC,
  TitleWrapper,
  Wrapper,
} from './TaskComments.styled';
import { TaskCommentsProps } from './TaskComments.types';
import { TaskCommentsList } from './TaskCommentsList';

export const TaskComments: FC<TaskCommentsProps> = ({
  comments,
  handleAddComment,
  handleSetComment,
  commentText,
}) => {
  const isCurrentCommentEmpty = commentText === '';
  const disabled = isCurrentCommentEmpty;

  return (
    <Wrapper>
      <TitleWrapper>Комментарии к задаче</TitleWrapper>
      <CommentInputWrapper>
        <div>
          <IconWrapper>
            <UserIcon />
          </IconWrapper>
        </div>
        <InputSC
          small
          value={commentText}
          onChange={(e) => handleSetComment(e.target.value)}
        />
      </CommentInputWrapper>
      <ButtonWrapper>
        <Button
          disabled={disabled}
          type={disabled ? 'ghost' : 'primary'}
          size="s"
          onClick={handleAddComment}
        >
          Добавить комментарий
        </Button>
      </ButtonWrapper>
      <TaskCommentsList comments={comments} />
    </Wrapper>
  );
};
