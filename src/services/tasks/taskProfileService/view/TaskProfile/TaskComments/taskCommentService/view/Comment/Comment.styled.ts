import { Input } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div<{ isEditing: boolean }>`
  display: flex;
  margin-top: 16px;
  align-items: center;
  max-width: ${({ isEditing }) => (isEditing ? '600px' : '100%')};
`;

export const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid;

  display: flex;
  align-items: center;
  justify-content: center;

  border-color: #f3f5f6;
  background-color: #f3f5f6;
`;

export const TimeWrapper = styled.div`
  margin-left: 16px;
  color: #272f5a52;
  font-size: 12px;
`;

export const AuthorWrapper = styled.div`
  color: #272f5ab2;
  font-size: 12px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  justify-content: space-between;
`;

export const CommentWrapper = styled.div`
  margin-left: 16px;
`;

export const CommentText = styled.div`
  color: #272f5ae5;
  font-size: 14px;
  width: 400px;
  line-height: 32px;
`;

export const TextareaSC = styled(Input.TextArea)`
  height: 6px;
  border: 1px solid #189ee9;
  border-radius: 4px;
  margin-top: 12px;
  width: 430px;
`;

export const CommentFooter = styled.div`
  margin-top: 12px;
  margin-right: 70px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const LeftBlock = styled.div`
  display: flex;
`;
