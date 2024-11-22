import styled from 'styled-components';

export const Wrapper = styled.div<{ isCommon: boolean }>`
  display: grid;
  grid-template-columns: ${({ isCommon }) => (!isCommon ? 'auto' : '')} 1.2fr 1fr 1fr 1.5fr auto;
  gap: 8px;
`;
