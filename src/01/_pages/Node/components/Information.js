import React, { useContext } from 'react';
import { ListWrap, ListItem, Title } from '01/_components/List';
import { Subtitle } from '../../../_components/Headers';
import { NodeContext } from '../index';

export const Information = (loading = true) => {
  const { node } = useContext(NodeContext);
  const {
    address, diameter,
  } = node;
  const {
    city, street, housingStockNumber, corpus, id,
  } = address;

  return (
    <ListWrap>
      <Title>Информация</Title>
      <ListItem>
        <span>Адрес</span>
        <Subtitle to={`/objects/${id}`}>
          {`${city}, ${street}, ${housingStockNumber} ${corpus ? `, к.${corpus}` : ''}`}
        </Subtitle>
      </ListItem>
      <ListItem>
        <span>Тип узла</span>
        <span>Коммерческий учет показетелей прибора</span>
      </ListItem>
      <ListItem>
        <span>Статус узла</span>
        <span>Сдан</span>
      </ListItem>
    </ListWrap>
  );
};

export default Information;
