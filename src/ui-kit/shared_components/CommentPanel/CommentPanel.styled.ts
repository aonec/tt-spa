import styled from 'styled-components';

export const CommentComponent = styled.div`
  width: 312px;
  height: max-content;
  background: #ffffff;
  border: 1px solid #f3f5f6;
  box-shadow: 0px 4px 4px rgba(78, 93, 146, 0.16),
    0px 8px 16px rgba(78, 93, 146, 0.08);
  border-radius: 4px;
  padding: 14px;
  margin: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentTitle = styled.div`
  color: #272f5a;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const RightButtonsBlock = styled.div``;

export const CommentText = styled.textarea`
  font: inherit;
  border: none;
  width: 100%;
  height: 300px;
  overflow: none;
  resize: none;

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
