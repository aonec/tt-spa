import styled from 'styled-components';
import { Input } from 'ui-kit/Input';
import { PencilIcon } from 'ui-kit/icons';

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Comment = styled.div`
  color: #272f5ae5;
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 25, 0.06);
  }
`;

export const TextareaSC = styled(Input.TextArea)`
  border: 1px solid #189ee9;
  border-radius: 4px;
`;

export const CommentFooter = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const PencilIconSC = styled(PencilIcon)`
  cursor: pointer;
`;

export const Label = styled.div`
  color: #272f5ab2;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;
`;
