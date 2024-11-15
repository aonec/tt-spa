import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const UnitWrapper = styled.span`
  font-size: 18px;
  transform: translateY(3px);
`;

export const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const Percent = styled.div<{ isPositive: boolean }>`
  width: max-content;
  font-size: 12px;
  font-weight: 500;
  transform: translateY(5px);
  color: ${({ isPositive }) => (isPositive ? '#17B45A' : '#FC525B')};
`;
