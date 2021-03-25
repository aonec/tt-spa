import styled, { css } from 'styled-components';

interface Props {
  size?: string;
}
export const Title = styled.h2<Props>`
  font-weight: 300;
  color: #ffffff;

  ${({ size }) =>
    (size === '40' &&
      css`
        font-size: 40px;
        line-height: 48px;
      `) ||
    (size === 'middle' &&
      css`
        font-size: 32px;
        line-height: 48px;
      `) ||
    (size === '24' &&
      css`
        font-size: 24px;
        line-height: 32px;
      `) ||
    (size === 'big' &&
      css`
        font-size: 40px;
        line-height: 48px;
      `) ||
    (size === 'medium' &&
      css`
        font-size: 24px;
        line-height: 32px;
      `)};
  ${({ color }) =>
    (color === 'black' &&
      css`
        color: #272f5a;
      `) ||
    (color === 'inherit' &&
      css`
        color: red;
      `)};
`;

export default Title;

// ${({ someprop }) => (someprop === 'somevalue'
//     && css`
//         color: blue;
//       `)
// || (someprop === 'red'
//     && css`
//         color: red;
//       `)};
