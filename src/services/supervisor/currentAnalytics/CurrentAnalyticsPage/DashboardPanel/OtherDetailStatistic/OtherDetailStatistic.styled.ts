import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NotClosedTaskCount = styled.span<{ isPositive?: boolean }>`
  color: ${({ isPositive }) => isPositive && '#f5222d'};
  font-weight: ${({ isPositive }) => isPositive && 700};
`;
