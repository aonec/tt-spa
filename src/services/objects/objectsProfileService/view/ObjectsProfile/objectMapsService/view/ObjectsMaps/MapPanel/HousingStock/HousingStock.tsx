import React, { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import {
  Address,
  AddressWrapper,
  ChevronWrapper,
  City,
  Header,
  InfoWrapper,
  Wrapper,
} from './HousingStock.styled';
import { HousingStockProps } from './HousingStock.types';

export const HousingStock: FC<HousingStockProps> = ({
  housingStock,
  clearHosuingStock,
}) => {
  return (
    <Wrapper>
      <Header>
        <ChevronWrapper onClick={clearHosuingStock}>
          <ChevronLeft />
        </ChevronWrapper>
        <AddressWrapper>
          <Address>{getHousingStockAddress(housingStock)}</Address>
          <City>Нижнекамск, республика Татарстан</City>
        </AddressWrapper>
      </Header>
      <InfoWrapper></InfoWrapper>
    </Wrapper>
  );
};
