import React, {useReducer} from 'react';
import styled, { css } from 'reshadow/macro';
import { Link as LinkRow } from 'react-router-dom';

import axios, { cancel } from '01/axios';
import { Loader, Icon } from '01/components';
import ObjectsSearchForm from "./ObjectsSearchForm/ObjectsSearchForm";
import {objectsSearchReducer} from "./ObjectsSearchForm/objectsSearchReducer";
import {formQueryString} from "../../utils/formQueryString";
import {useDebounce} from "../../hooks/useDebounce";

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
    HousingStockNumber: ''
}

export const Objects = () => {
    const [state, setState] = React.useState({ items: null });
    const [searchState, dispatchSearchState] = useReducer(objectsSearchReducer, initialState);

    const debouncedSearchState = useDebounce(searchState, 500);

    React.useEffect(() => {
        (async () => {
            const queryString = formQueryString(debouncedSearchState)
            const res = await axios.get('HousingStocks' + queryString);
            setState(res);
        })();
        return () => cancel();
    }, [debouncedSearchState]);

    const { items } = state;
    return styled(styles)(
        <div style={{width: 960}}>
            <h1 style={{ fontWeight: 300, marginBottom: 24 }}>Объекты</h1>
            <ObjectsSearchForm searchState={searchState} dispatchSearchState={dispatchSearchState}/>
            <Loader show={!items} size="32">
                {items?.map(
                    ({
                         city, id, number, numberOfTasks, street, numberOfApartments,
                     }) => {
                        const task = numberOfTasks ? (
                            <task>
                                <Icon icon="alarm" />
                                Задач:
                                {' '}
                                {numberOfTasks}
                            </task>
                        ) : null;

                        return (
                            <obj_item key={id}>
                                <LinkRow to={`/objects/${id}`}>
                              <span>
                                <h4 style={{whiteSpace: 'nowrap'}}>
                                  {street}
                                    ,
                                    {' '}
                                    {number}
                                </h4>
                                  {task}
                              </span>
                                    <city>{city}</city>
                                    <span />
                                    <aparts>
                                        {numberOfApartments}
                                        {' '}
                                        квартир
                                    </aparts>
                                </LinkRow>
                            </obj_item>
                        );
                    },
                )}
            </Loader>
        </div>,
    );
};
