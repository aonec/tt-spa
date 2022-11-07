import React from 'react';
import { Route } from 'react-router-dom';

import { Loader } from '01/components';

export const Apartments = React.memo(
  ({ items = [], loading = true, path = null, onClick = () => {} }) => {
    return (
      <Route path={path}>
        <apartments>
          <h2>Список квартир</h2>
          <Loader show={loading} size="32" />
          {items.map(
            ({
              id,
              apartmentNumber,
              homeownerName,
              homeownersCount,
              personalAccountNumber,
              square,
            }) => (
              <item onClick={() => onClick(id)} key={id}>
                <h4>{`№ ${apartmentNumber}`}</h4>
                <item_owner>{homeownerName}</item_owner>
                <item_number>{personalAccountNumber}</item_number>
                <item_square>
                  {square ?? '-'} м<sup>2</sup>
                </item_square>
              </item>
            )
          )}
        </apartments>
      </Route>
    );
  }
);
