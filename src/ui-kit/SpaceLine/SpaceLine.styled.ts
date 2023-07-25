import styled from 'styled-components';

export const Wrapper = styled.div<{ noTop: boolean }>`
  margin-top: ${({ noTop }) => (!noTop ? '16px' : '')};
  margin-bottom: 16px;
`;

export const Line = styled.div`
  border-top: 2px solid #f3f3f3;
`;
