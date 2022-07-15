import React from 'react';
import styled from 'styled-components';
import { Title } from './Title';
import { Text } from './Text';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';

export const Header = ({ apartment }) => {
  return (
    <HeaderWrap>
      <div className="apartment-header__wrap">
        <Title size="32">Кв. №{apartment.apartmentNumber}</Title>
        <Text>{getHousingStockAddress(apartment.housingStock, true)}</Text>
      </div>
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
