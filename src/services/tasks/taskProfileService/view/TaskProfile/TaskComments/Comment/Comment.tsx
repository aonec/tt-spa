import React, { FC } from 'react';
import { UserIcon } from 'ui-kit/icons';
import { IconWrapper, Wrapper } from './Comment.styled';
import { CommentProps } from './Comment.types';

export const Comment: FC<CommentProps> = ({comment}) => {
  const {} = comment;

  return (
    <Wrapper>
      <IconWrapper>
        <UserIcon />
      </IconWrapper>
    </Wrapper>
  );
};
