import React, { FC } from 'react';
import {
  AddressItem,
  Footer,
  Header,
  ListWrapper,
  Title,
  Wrapper,
} from './SelectedHousingStocksPanel.styled';
import { SelectedHousingStocksProps } from './SelectedHousingStocksPanel.types';
import { Checkbox, Empty } from 'antd';
import { sortBy } from 'lodash';
import { Button } from 'ui-kit/Button';

export const SelectedHousingStocksPanel: FC<SelectedHousingStocksProps> = ({
  housesInDistrict,
  selectedHousingStocks,
  toggleHousingStock,
  handleCancel,
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
            <Checkbox
              onChange={() => toggleHousingStock(elem.id)}
              checked={selectedHousingStocks.includes(elem.id)}
            >
              {elem.address?.mainAddress?.street}
              {', '}
              {elem.address?.mainAddress?.number}
            </Checkbox>
          </AddressItem>
        ))}
        {!housesInDistrict.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </ListWrapper>
      <Footer>
        <Button size="small" type="ghost" onClick={handleCancel}>
          Отмена
        </Button>
        <Button size="small">Сохранить</Button>
      </Footer>
    </Wrapper>
  );
};
