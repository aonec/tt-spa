import React from 'react';
import styled from 'styled-components';
import { Title } from './Title';
import { Text } from './Text';
import { MenuButtonTT } from '../../../tt-components';

export const Header = ({ apartmentNumber, city, street, number }) => {
  return (
    <HeaderWrap>
      <div className="apartment-header__wrap">
        <Title size="32">Кв. №{apartmentNumber}</Title>
        <Text>
          {city}, {street}, {number}
        </Text>
      </div>
      <MenuButtonTT menuButtonArr={[]} />
    </HeaderWrap>
  );
};

export default Header;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: baseline;
`;
