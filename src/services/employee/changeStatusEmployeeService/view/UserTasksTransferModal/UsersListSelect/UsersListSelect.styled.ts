import styled from 'styled-components';

export const Wrapper = styled.div`
  transform: translateX(-16px);
  width: calc(100% + 32px);
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
  padding: 0 16px;

  &:hover {
    background: rgba(24, 158, 233, 0.16);
  }
`;

export const UserName = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #272f5a;
`;

export const TasksCount = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(39, 47, 90, 0.7);
`;

export const TasksCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
