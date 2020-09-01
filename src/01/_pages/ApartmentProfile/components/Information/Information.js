import React from 'react';
import { ListItem, ListItemDescription, ListItemValue } from '../ListItem';
import { Title } from '../Title';

export const Information = (props) => {
  // Пустышка для mapProps
  const data = [
    '78 м2',
    '4',
    '4',
  ];

  const descriptions = [
    'Площадь жилого помещения',
    'Количество проживающих / зарегистрированных',
    'Нормативное количество проживающих',
  ];

  const { normativeNumberOfLiving, numberOfLiving, square } = props;
  const mapProps = [normativeNumberOfLiving, numberOfLiving, square];

  const list = data.map((value, index) => (
    <ListItem>
      <ListItemDescription>{descriptions[index]}</ListItemDescription>
      <ListItemValue>{mapProps[index]}</ListItemValue>
    </ListItem>
  ));

  return (
    <div style={{ paddingTop: '32px' }}>
      <Title size="24">Информация</Title>
      {list}
    </div>
  );
};
