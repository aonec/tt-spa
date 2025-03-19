import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
  background-color: rgba(65, 74, 117, 1);
  padding: 2px 6px;
  border-radius: 6px;
`;

export const Expired = styled.div<{ isExpired: boolean }>`
  color: ${({ isExpired }) => (isExpired ? 'rgba(252, 82, 91, 1)' : '#fff')};
`;

export const MalfunctionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TasksCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
