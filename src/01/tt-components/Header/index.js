import styled, { css } from 'styled-components';

export const Header = styled.h1`
  font-weight: 300;
  color: #272f5a;
  font-size: 32px;
  line-height: 1.5;
  // margin-bottom: 32px;
   margin-bottom: 22px;

${({ color }) => (color === 'white'
  && css`
color: #FFFFFF;
  `)
|| (color === 'black'
  && css`
  color: #272f5a;
  `)};
  
`;

export default Header;
