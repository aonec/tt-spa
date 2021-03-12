import React, { useReducer } from 'react'
import styled from 'reshadow/macro'
import { NavLink } from 'react-router-dom'

import { tabs } from '01/r_comp'

import { useTasks } from './useTasks'
import { TasksList } from './components/TasksList'
import TasksSearchForm from './components/TasksSearchForm/TasksSearchForm'
import tasksSearchReducer from './components/TasksSearchForm/tasksSearchReducer'
import { useDebounce } from '../../hooks/useDebounce'

const tabItems = [
    ['К исполнению', 'executing'],
    ['Наблюдаемые', 'observing'],
    ['Архив', 'archived'],
]

const Tabs = React.memo(({ total = [] }) =>
    styled(tabs)(
        <tabs>
            {tabItems.map(({ 0: name, 1: to }, i) => (
                <NavLink key={to} to={to} activeClassName={tabs.active} replace>
                    {name} {!!total[i] && `(${total[i]})`}
                </NavLink>
            ))}
        </tabs>
    )
)

export const Tasks = () => {
    const [searchState, dispatchSearchState] = useReducer(
        tasksSearchReducer,
        {}
    )

    const debouncedSearchState = useDebounce(searchState, 500)

    const { items, executingTasksCount, observingTasksCount } = useTasks(
        debouncedSearchState
    )
    return (
        <div style={{ maxWidth: 960 }}>
            <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Задачи</h1>
            <Tabs total={[executingTasksCount, observingTasksCount]} />
            <TasksSearchForm
                searchState={searchState}
                dispatchSearchState={dispatchSearchState}
            />
            <TasksList items={items} />
        </div>
    )
}
