import { ButtonTT } from '01/tt-components';
import { useFormik } from 'formik';
import React, { FC, useCallback, useMemo } from 'react';
import { UserIcon } from 'ui-kit/icons';
import { Comment } from './Comment';
import {
  ButtonWrapper,
  CommentInputWrapper,
  IconWrapper,
  InputSC,
  TitleWrapper,
  Wrapper,
} from './TaskComments.styled';
import { TaskCommentsProps } from './TaskComments.types';

export const TaskComments: FC<TaskCommentsProps> = ({
  comments,
  handleAddComment,
  handleSetComment,
  isPerpetrator,
  commentText,
}) => {
  const commentsList = useMemo(
    () =>
      comments.map((comment) => <Comment key={comment.id} comment={comment} />),
    [comments]
  );

  const isCurrentCommentEmpty = commentText === '';
  const disabled = isCurrentCommentEmpty || !isPerpetrator;

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
          value={commentText}
          onChange={(e) => handleSetComment(e.target.value)}
        />
      </CommentInputWrapper>
      <ButtonWrapper>
        <ButtonTT
          disabled={disabled}
          color="blue"
          type="submit"
          small
          onClick={handleAddComment}
        >
          Добавить комментарий
        </ButtonTT>
      </ButtonWrapper>
      {commentsList}
    </Wrapper>
  );
};
