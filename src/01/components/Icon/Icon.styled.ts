import styled from 'styled-components';

export const IconWrapper = styled.div<{ size: number }>`
  svg {
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
  }
`;
