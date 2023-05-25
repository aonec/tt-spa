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

export const CreateDistrictFormPanel: FC<CreateDistrictFormPanelProps> = ({
  housingStocksInDistrict,
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>Выбранные адреса</Title>
      </Header>
      <ListWrapper>
        {housingStocksInDistrict.map((elem) => (
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
