import styled, { css } from 'styled-components';

export const ButtonTT = styled.button`
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  height: 48px;
  border: 1px solid #dcdee4;
  padding: 8px 24px;
  &:hover {
    border: 1px solid #000000;
  }
  ${({ color }) => (color === 'red'
      && css`
        background: #fc525b;
        color: #ffffff;
      `)
    || (color === 'blue'
      && css`
        background: #189ee9;
        color: #ffffff;
      `)};
`;

export default ButtonTT;
