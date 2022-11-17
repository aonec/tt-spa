import React, { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { Button } from 'ui-kit/Button';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import {
  Address,
  AddressWrapper,
  ChevronWrapper,
  City,
  Footer,
  Header,
  InfoItem,
  InfoItemKey,
  InfoItemValue,
  InfoWrapper,
  Wrapper,
} from './HousingStock.styled';
import { HousingStockProps } from './HousingStock.types';

export const HousingStock: FC<HousingStockProps> = ({
  housingStock,
  clearHosuingStock,
}) => {
  const info = [
    { key: 'Город', value: 'Нижнекамск' },
    { key: 'Количество этажей', value: '9' },
    { key: 'Количество квартир', value: '84' },
    { key: 'Общая площадь жилых помещений', value: '5 686.10 м2' },
    { key: 'Общая площадь', value: '7 612 м2' },
    { key: 'Количество задач', value: '2' },
  ];

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
      <InfoWrapper>
        {info.map((elem) => (
          <InfoItem key={elem.key}>
            <InfoItemKey>{elem.key}</InfoItemKey>
            <InfoItemValue>{elem.value}</InfoItemValue>
          </InfoItem>
        ))}
      </InfoWrapper>
      <Footer>
        <Button size="small">Перейти к объекту</Button>
      </Footer>
    </Wrapper>
  );
};
