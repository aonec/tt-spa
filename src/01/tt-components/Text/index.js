import styled, { css } from 'styled-components';

export const Text = styled.p`
  font-size: 14px;
  line-height: 16px;

  ${({ someprop }) =>
    (someprop === 'somevalue' &&
      css`
        color: blue;
      `) ||
    (someprop === 'red' &&
      css`
        color: red;
      `)};
`;

export default Text;
