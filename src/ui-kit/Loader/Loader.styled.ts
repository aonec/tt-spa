import styled, { keyframes } from 'styled-components';

export const rotation = keyframes`
  from {
    transform: rotate(0);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderWrapper = styled.div<{ size: number }>`
  margin-top: 4px;

  svg {
    animation: ${rotation} 1000ms linear infinite;
    margin: 0 auto;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
  }
`;
