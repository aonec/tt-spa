import styled from 'styled-components';

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  width: fit-content;

  gap: 8px;
  color: #272f5ae5;

  user-select: none;
  cursor: pointer;
`;

export const Circle = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background-color: ${({ color }) => color};
`;
