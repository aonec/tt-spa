import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const SelectTitle = styled.div`
  color: #272f5a;
  font-weight: 500;
`;

export const GroupWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  gap: 8px;
  color: #272f5ae5;
`;

export const Circle = styled.div<{ color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background-color: ${({ color }) => color};
`;
