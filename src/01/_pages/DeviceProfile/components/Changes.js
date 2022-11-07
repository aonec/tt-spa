/* eslint-disable */

import React from 'react';
import { Route } from 'react-router-dom';

export const Changes = React.memo(
  ({ items = [], loading = true, path = null, onClick = () => {} }) => {
    items = [
      {
        id: 0,
        date: '16.08.2020 20:48',
        action: 'Редактирование поля «Дата следующей поверки»',
        name: 'Константинопольский К.К',
      },
      {
        id: 1,
        date: '16.08.2019 12:11',
        action: 'Создание прибора',
        name: 'Константинопольский К.К',
      },
      {
        id: 2,
        date: '16.08.2019 12:11',
        action: 'Создание прибора',
        name: 'Константинопольский К.К',
      },
      {
        id: 3,
        date: '16.08.2019 12:11',
        action: 'Создание прибора',
        name: 'Константинопольский К.К',
      },
      {
        id: 4,
        date: '16.08.2019 12:11',
        action: 'Создание прибора',
        name: 'Константинопольский К.К',
      },
    ];
    return (
      <Route path={path}>
        <changes>
          <wrap className="descriptions">
            <ww>Дата и время</ww>
            <ww>Действие</ww>
            <ww>Исполнитель</ww>
          </wrap>
          {items.map(({ id, date, action, name }) => (
            <item onClick={() => onClick(id)} key={id}>
              {/* <h4>{`№ ${date}`}</h4> */}
              <item_date>{date}</item_date>
              <item_action>{action}</item_action>
              <item_executor>
                {/* {name ?? "-"} м<sup>2</sup> */}
                {name}
              </item_executor>
            </item>
          ))}
        </changes>
      </Route>
    );
  }
);
