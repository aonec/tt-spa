import styled, { css } from 'styled-components';

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  grid-template-rows: 48px 16px;
  grid-gap: 8px;
  align-items: center;
`;

export const Header = styled.h1`
  font-weight: 300;
  color: #272f5a;
  font-size: 32px;
  line-height: 1.5;
  margin-bottom: 22px;

  ${({ color }) =>
    (color === 'white' &&
      css`
        color: #ffffff;
      `) ||
    (color === 'black' &&
      css`
        color: #272f5a;
      `)};
`;

export default Header;
