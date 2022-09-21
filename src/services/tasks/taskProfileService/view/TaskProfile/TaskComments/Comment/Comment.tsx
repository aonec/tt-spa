import React, { FC } from 'react';
import { UserIcon } from 'ui-kit/icons';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  AuthorWrapper,
  CommentText,
  CommentWrapper,
  IconWrapper,
  InfoWrapper,
  TimeWrapper,
  Wrapper,
} from './Comment.styled';
import { CommentProps } from './Comment.types';

export const Comment: FC<CommentProps> = ({ comment }) => {
  const { author, createdAt, text } = comment;
  const preparedDate = getTimeStringByUTC(createdAt);

  return (
    <Wrapper>
      <div>
        <IconWrapper>
          <UserIcon />
        </IconWrapper>
      </div>
      <CommentWrapper>
        <InfoWrapper>
          <AuthorWrapper>{author}</AuthorWrapper>
          <TimeWrapper>{preparedDate}</TimeWrapper>
        </InfoWrapper>
        <CommentText>{text}</CommentText>
      </CommentWrapper>
    </Wrapper>
  );
};
