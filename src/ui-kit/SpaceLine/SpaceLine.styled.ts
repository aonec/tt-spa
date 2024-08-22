import styled from 'styled-components';

export const Wrapper = styled.div<{ noTop: boolean; noPadding: boolean }>`
  margin-top: ${({ noTop }) => (!noTop ? '16px' : '')};
  margin-bottom: 16px;
  ${({ noPadding }) => (noPadding ? 'margin: 0;' : '')}
`;

export const Line = styled.div`
  border-top: 2px solid #f3f3f3;
`;
