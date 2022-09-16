import styled from 'styled-components';

export const StyledGridTableBody = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr 0.8fr 0.8fr 1.2fr 1.5fr;
  width: 960px;
  gap: 16px;
  padding: 10px 20px;
  border-bottom: 1px solid #f3f5f6;
  transition: 0.2s;

  &:hover {
    background-color: #f3fafe;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ResourceTextWrapper = styled.div`
  color: #272f5a;
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80px;
`;

export const SenderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTextElement = styled.div`
  display: flex;
  align-items: center;
  color: #272f5a;
`;

export const SenderWrapper = styled(StyledTextElement)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 110px;
`;

export const StyledLinkTypeElement = styled(StyledTextElement)`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #189ee9;
  }
`;
