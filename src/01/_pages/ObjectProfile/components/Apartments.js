/* eslint-disable */

import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';

import { Loader } from '01/components';
import * as style from '_reshadow';

export const Apartments = React.memo(
  ({
    items = [],
    loading = true,
    path = null,
    onClick = () => {},
    apartmentId,
    setApartmentId,
  }) => {
    useEffect(() => {
      if (!loading && apartmentId) {
        const apartment = document.getElementById(apartmentId);
        if (!apartment) {
          return setApartmentId(null);
        }
        apartment.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, [loading]);

    return (
      <Route path={path} exact>
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
              <item
                onClick={() => {
                  onClick(id);
                  setApartmentId(id);
                }}
                key={id}
                id={id}
              >
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
