import React, {useReducer} from 'react'
import styled from 'reshadow/macro'
import {NavLink} from 'react-router-dom'

import {tabs} from '01/r_comp'

import {useTasks} from './useTasks'
import {TasksList} from './components/TasksList'
import TasksSearchForm from './components/TasksSearchForm/TasksSearchForm'
import tasksSearchReducer from './components/TasksSearchForm/tasksSearchReducer'
import {useDebounce} from '../../hooks/useDebounce'
import getAccessesList from "../../_api/utils/getAccessesList";

const tabItems = [
    ['К исполнению', 'executing'],
    ['Наблюдаемые', 'observing'],
    ['Архив', 'archived'],
]

const tabItemsWatcher = [
    // ['К исполнению', 'executing'],
    ['Наблюдаемые', 'observing'],
    ['Архив', 'archived'],
]


export const Tasks = () => {
    const access = getAccessesList();
    const {show} = access;
    const Tabs = React.memo(({total = [],}) => {
            return (
                styled(tabs)(
                    <tabs>
                        {tabItems.map(({0: name, 1: to}, i) => {
                                if (!show('CalculatorUpdate') && i === 0) {
                                    return null
                                }
                                return (
                                    <NavLink key={to} to={to} activeClassName={tabs.active} replace>
                                        {name} {!!total[i] && `(${total[i]})`}
                                    </NavLink>)
                            }
                        )}

                    </tabs>
                )
            )
        }
    )
    // const {show} = access;
    const [searchState, dispatchSearchState] = useReducer(
        tasksSearchReducer,
        {}
    )

    const debouncedSearchState = useDebounce(searchState, 500)

    const {items, executingTasksCount, observingTasksCount} = useTasks(
        debouncedSearchState
    )
    console.log(useTasks(
        debouncedSearchState
    ))
    return (
        <div style={{maxWidth: 960}}>
            <h1 style={{fontWeight: 300, marginBottom: 16}}>Задачи</h1>
            <Tabs total={[executingTasksCount, observingTasksCount]}/>
            <TasksSearchForm
                searchState={searchState}
                dispatchSearchState={dispatchSearchState}
            />
            <TasksList items={items}/>
        </div>
    )
}
