import React, { FC } from 'react';
import { Empty } from 'antd';
import {
  AddressItem,
  Footer,
  Header,
  ListWrapper,
  Title,
  Wrapper,
} from './SelectedHousingStocksPanel.styled';
import { SelectedHousingStocksProps } from './SelectedHousingStocksPanel.types';
import { sortBy } from 'lodash';
import { Button } from 'ui-kit/Button';

export const SelectedHousingStocksPanel: FC<SelectedHousingStocksProps> = ({
  handleCancel,
  isLoading,
  handleUpdate,
  housesInDistrict,
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>Выбранные адреса</Title>
      </Header>
      <ListWrapper>
        {sortBy(housesInDistrict, (elem) => {
          const address = elem.address?.mainAddress;
          return `${address?.street}${address?.number}${address?.corpus || ''}`;
        }).map((elem) => (
          <AddressItem key={elem.id}>
            {elem.address?.mainAddress?.street}
            {', '}
            {elem.address?.mainAddress?.number}
          </AddressItem>
        ))}
        {!housesInDistrict.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </ListWrapper>
      <Footer>
        <Button size="s" type="ghost" onClick={handleCancel}>
          Отмена
        </Button>
        <Button size="s" isLoading={isLoading} onClick={handleUpdate}>
          Сохранить
        </Button>
      </Footer>
    </Wrapper>
  );
};
