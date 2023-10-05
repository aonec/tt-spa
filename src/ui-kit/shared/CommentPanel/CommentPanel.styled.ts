import styled from 'styled-components';
import { Input } from 'ui-kit/Input';

export const CommentComponent = styled.div`
  min-width: 312px;
  width: 100%;

  height: max-content;
  background: #ffffff;
  border: 1px solid #f3f5f6;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 14px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentTitle = styled.div`
  color: #272f5a;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
`;

export const RightButtonsBlock = styled.div``;

export const CommentText = styled.div`
  font: inherit;
  border: none;
  width: 100%;
  overflow: none;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #272f5a;
  margin-top: 12px;
`;

export const CommentInfo = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
`;

export const UserName = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.9);
  margin: 0px 6px;
`;

export const CommentDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`;

export const IconSubstrate = styled.div`
  display: flex;
  border-radius: 50%;
  background: #f3f5f6;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const TextareaSC = styled(Input.TextArea)`
  border: 1px solid #189ee9;
  border-radius: 4px;
  margin-top: 12px;
`;

export const CommentFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const AddCommentWrapper = styled.div`
  color: #189ee9;
  cursor: pointer;
`;
