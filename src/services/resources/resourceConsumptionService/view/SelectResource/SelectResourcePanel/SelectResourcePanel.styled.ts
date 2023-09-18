import styled from 'styled-components';

export const Wrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-self: start;

  align-items: flex-start;

  height: 72px;
  width: 100%;

  min-width: 160px;
  padding: 16px;

  border-radius: 4px;
  border: ${({ active }) => `1px solid ${active ? '#189ee9' : '#dcdee4'}`};
  box-shadow: ${({ active }) => (active ? '0 4px 8px 0 #189ee955' : 'none')};
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #189ee9;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 8px;
  color: #272f5ae5;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SummaryWrapper = styled.div`
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;
