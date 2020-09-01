import React from 'react';
import styled from 'styled-components';

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr 2fr 3fr;
  background: rgba(39, 47, 90, 0.04);
  padding: 16px;
`;

const Title = styled.h5`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

export function Header() {
  return (
    <HeaderWrap>
      <Title>Информация о приборе</Title>
      <Title>Февраль 2020</Title>
      <Title>Январь 2020</Title>
      <div />
    </HeaderWrap>
  );
}

export default Header;
