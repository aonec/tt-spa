/* eslint-disable */

import React, { useReducer, useState } from 'react';
import styled, { css } from '@reshadow/macro';
import { Link as LinkRow, Redirect } from 'react-router-dom';

import axios from '01/axios';
import { Loader, Icon } from '../../components';
import ObjectsSearchForm from './ObjectsSearchForm/ObjectsSearchForm';
import { objectsSearchReducer } from '../../Redux/reducers/objectsSearchReducer';
import { formQueryString } from '../../utils/formQueryString';
import { useDebounce } from '../../hooks/useDebounce';
import { sortObjects } from '../../utils/sortObjects';
import Header from './ObjectsSearchForm/components/Header';

const styles = css`
  obj_item {
    display: grid;
    grid-template-columns: 2fr repeat(3, 0.5fr);
    align-items: center;
    width: 100%;
    line-height: 32px;
    padding: 8px;

    &:hover {
      box-shadow: var(--shadow);
    }
  }

  span,
  city,
  task {
    display: flex;
    align-items: center;
  }

  city,
  task {
    opacity: 0.8;
  }

  task Icon {
    color: var(--error);
    margin-left: 16px;
    margin-right: 8px;
  }

  aparts {
    opacity: 0.6;
    text-align: right;
  }

  LinkRow {
    display: contents;

    &:hover {
      color: var(--primary-100);
    }
  }
`;

const initialState = {
  city: '',
  Street: '',
  HousingStockNumber: '',
  Corpus: '',
};

export const StyledObject = ({
  id,
  street,
  number,
  corpus,
  numberOfApartments,
  numberOfTasks,
  city,
}) => {
  const task = numberOfTasks ? (
    <task>
      <Icon icon="alarm" />
      Задач: {numberOfTasks}
    </task>
  ) : null;

  return styled(styles)(
    <obj_item key={id}>
      <LinkRow to={`/meters/houses/${id}`}>
        <span>
          <h4 style={{ whiteSpace: 'nowrap' }}>
            {street}, {number} {corpus ? `, к.${corpus}` : null}
          </h4>
          {task}
        </span>
        <city>{city}</city>
        <span />
        <aparts>{numberOfApartments} квартир</aparts>
      </LinkRow>
    </obj_item>
  );
};

export const Objects = ({ isReadings = false }) => {
  const [state, setState] = useState({ items: null });
  const [searchState, dispatchSearchState] = useReducer(
    objectsSearchReducer,
    initialState
  );

  const debouncedSearchState = useDebounce(searchState, 500);

  React.useEffect(() => {
    (async () => {
      const queryString = formQueryString(debouncedSearchState);
      const res = await axios.get(`HousingStocks${queryString}`);
      setState(res);
    })();
  }, [debouncedSearchState]);

  const { items } = state;

  if (items?.length === 1 && isReadings)
    return <Redirect to={`/meters/houses/${items[0].id}`} />;

  return styled(styles)(
    <div>
      {!isReadings ? <Header /> : null}
      <div style={{ width: 960 }}>
        <ObjectsSearchForm
          searchState={searchState}
          dispatchSearchState={dispatchSearchState}
        />
        <Loader show={!items} size="32">
          {items?.sort(sortObjects)?.map((object) => {
            const {
              city,
              id,
              number,
              numberOfTasks,
              street,
              corpus,
              numberOfApartments,
              address,
            } = object;

            const { additionalAddresses } = address;

            const task = numberOfTasks ? (
              <task>
                <Icon icon="alarm" />
                Задач: {numberOfTasks}
              </task>
            ) : null;

            const additionalAddressesString = additionalAddresses
              .map((elem) => `${elem.street}, ${elem.number}`)
              .join(' ');

            return (
              <obj_item key={id}>
                <LinkRow
                  to={!isReadings ? `/objects/${id}` : `/meters/houses/${id}`}
                >
                  <span>
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          color: '#272F5A',
                        }}
                      >
                        {street}, {number} {corpus ? `, к.${corpus}` : null}
                      </div>
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#272F5AAA',
                          marginLeft: '10px',
                        }}
                      >
                        {additionalAddressesString}
                      </span>
                    </div>
                    {task}
                  </span>
                  <city>{city}</city>
                  <span />
                  <aparts>{numberOfApartments} квартир</aparts>
                </LinkRow>
              </obj_item>
            );
          })}
        </Loader>
      </div>
    </div>
  );
};
