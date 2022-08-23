import React from 'react';
import { ListItem, ListItemDescription, ListItemValue } from '../ListItem';
import { Title } from '../Title';

export const Information = (props) => {
  // Пустышка для mapProps

  const descriptions = [
    'Площадь жилого помещения',
    'Количество проживающих / зарегистрированных',
    'Кол-во стояков холодной воды',
    'Кол-во стояков горячей воды',
  ];

  const {
    square,
    numberOfLiving,
    normativeNumberOfLiving,
    coldWaterRiserCount,
    hotWaterRiserCount,
  } = props;

  const mapProps = [
    square,
    numberOfLiving,
    coldWaterRiserCount,
    hotWaterRiserCount,
  ];

  const list = descriptions.map((value, index) => (
    <ListItem key={index}>
      <ListItemDescription>{descriptions[index]}</ListItemDescription>
      <ListItemValue>{mapProps[index] || '—'}</ListItemValue>
    </ListItem>
  ));

  return (
    <div>
      <Title size="24">Информация</Title>
      {list}
    </div>
  );
};

export default Information;
