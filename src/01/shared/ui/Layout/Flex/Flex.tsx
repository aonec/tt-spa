import styled from 'styled-components';

export const Flex = styled.div<{
  h?: 'space-between' | 'flex-end' | 'flex-start' | 'space-around';
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ h }) => h};
`;
