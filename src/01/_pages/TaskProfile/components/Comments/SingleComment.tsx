import React from 'react';
import { TaskCommentResponse } from '../../../../../myApi';
import { Icon } from '../../../../tt-components/Icon';
import styled from 'styled-components';
import moment from 'moment';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';

const SingleComment = ({ comment }: { comment: TaskCommentResponse }) => {
  return (
    <CommentContainer>
      <IconContainer>
        <Icon icon="avatar" color="var(--main-100)" />
      </IconContainer>
      <CommentTextBlock>
        <div style={{ display: 'flex' }}>
          <Author>{comment.author}</Author>
          <CommentDate>
            {getTimeStringByUTC(comment.createdAt)}
          </CommentDate>
        </div>
        <CommentText>{comment.text}</CommentText>
      </CommentTextBlock>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 48px;
`;

const CommentTextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentDate = styled.div`
  color: var(--main-32);
  font-size: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--main-4);
  width: 32px;
  height: 32px;
  margin-right: 16px;
  margin-bottom: 8px;
`;

const Author = styled.div`
  color: var(--main-70);
  font-size: 12px;
  margin-right: 16px;
`;

const CommentText = styled.div`
  color: var(--main-90);
  font-size: 14px;
`;

export default SingleComment;
