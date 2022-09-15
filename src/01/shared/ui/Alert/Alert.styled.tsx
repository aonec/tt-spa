import styled from 'styled-components';

export const IconWrapper = styled.div<{ color?: string }>`
  path {
    ${({ color }) => `fill: ${color};`}
  }
`;
