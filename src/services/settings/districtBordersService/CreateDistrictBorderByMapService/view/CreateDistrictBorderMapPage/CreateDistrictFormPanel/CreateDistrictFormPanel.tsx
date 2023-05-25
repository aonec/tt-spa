import React, { FC } from 'react';
import {
  AddressItem,
  Footer,
  Header,
  ListWrapper,
  Title,
  Wrapper,
} from './CreateDistrictFormPanel.styled';
import { CreateDistrictFormPanelProps } from './CreateDistrictFormPanel.types';
import { Checkbox } from 'antd';
import { Button } from 'ui-kit/Button';
import { sortBy } from 'lodash';

export const CreateDistrictFormPanel: FC<CreateDistrictFormPanelProps> = ({
  housingStocksInDistrict,
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>Выбранные адреса</Title>
      </Header>
      <ListWrapper>
        {sortBy(housingStocksInDistrict, (elem) => {
          const address = elem.address?.mainAddress;
          return `${address?.street}${address?.number}${address?.corpus || ''}`;
        }).map((elem) => (
          <AddressItem>
            <Checkbox>
              {elem.address?.mainAddress?.street}
              {', '}
              {elem.address?.mainAddress?.number}
            </Checkbox>
          </AddressItem>
        ))}
      </ListWrapper>
      <Footer>
        <Button size="small" type="ghost">
          Отмена
        </Button>
        <Button size="small">Продолжить</Button>
      </Footer>
    </Wrapper>
  );
};
