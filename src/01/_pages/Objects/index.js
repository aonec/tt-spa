import React, {useReducer, useState} from 'react'
import styled, {css} from 'reshadow/macro'
import {Link as LinkRow, Redirect} from 'react-router-dom'

import axios, {cancel} from '01/axios'
import {Loader, Icon} from '01/components'
import ObjectsSearchForm from './ObjectsSearchForm/ObjectsSearchForm'
import {objectsSearchReducer} from '../../Redux/reducers/objectsSearchReducer'
import {formQueryString} from '../../utils/formQueryString'
import {useDebounce} from '../../hooks/useDebounce'
import {IconWithTooltip} from '../../components/NotConnectedIcon/IconWithTooltip'
import {sortObjects} from '../../utils/sortObjects'
import Header from "./ObjectsSearchForm/components/Header";
import ModalGroupReport from "./components/Modals/GroupReport";

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
`

const initialState = {
    city: '',
    Street: '',
    HousingStockNumber: '',
}

export const Objects = ({isReadings = false}) => {
    const [state, setState] = useState({items: null})
    const [searchState, dispatchSearchState] = useReducer(
        objectsSearchReducer,
        initialState
    )

    const debouncedSearchState = useDebounce(searchState, 500)

    React.useEffect(() => {
        (async () => {
            const queryString = formQueryString(debouncedSearchState)
            const res = await axios.get('HousingStocks' + queryString)
            setState(res)
        })()
        return () => cancel()
    }, [debouncedSearchState])

    const {items} = state

    if (items?.length === 1 && isReadings)
        return <Redirect to={`/meters/houses/${items[0].id}`}/>

    return styled(styles)(
        <div>
            {!isReadings ? (
              <h1 style={{ fontWeight: 300, marginBottom: 24 }}>Объекты</h1>
            ) : null}
            <div style={{width: 960}}>
                <ObjectsSearchForm
                    searchState={searchState}
                    dispatchSearchState={dispatchSearchState}
                />
                <Loader show={!items} size="32">
                    {items
                        ?.sort(sortObjects)
                        .map(
                            ({
                                 city,
                                 id,
                                 number,
                                 numberOfTasks,
                                 street,
                                 numberOfApartments,
                             }) => {
                                const task = numberOfTasks ? (
                                    <task>
                                        <Icon icon="alarm"/>
                                        Задач: {numberOfTasks}
                                    </task>
                                ) : null

                                return (
                                    <obj_item key={id}>
                                        <LinkRow
                                            to={
                                                !isReadings
                                                    ? `/objects/${id}`
                                                    : `/meters/houses/${id}`
                                            }
                                        >
                                        <span>
                                            <h4
                                                style={{whiteSpace: 'nowrap'}}
                                            >
                                                {street}, {number}
                                            </h4>
                                            {task}
                                        </span>
                                            <city>{city}</city>
                                            <span/>
                                            <aparts>
                                                {numberOfApartments} квартир
                                            </aparts>
                                        </LinkRow>
                                    </obj_item>
                                )
                            }
                        )}
                </Loader>
            </div>
        </div>

    )
}
