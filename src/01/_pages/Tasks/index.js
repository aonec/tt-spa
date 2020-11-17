import React from "react"
import styled from "reshadow/macro"
import { NavLink } from "react-router-dom"

import { tabs } from "01/r_comp"

import { useTasks } from "./useTasks"
import { TasksList } from "./components/TasksList"

const tabItems = [
  ["К исполнению", "executing"],
  ["Наблюдаемые", "observing"],
  ["Архив", "archived"],
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
  const { items, executingTasksCount, observingTasksCount } = useTasks()
  return (
    <div style={{maxWidth: 960}}>
      <h1 style={{fontWeight:300, marginBottom: 24}}>Задачи</h1>
      <Tabs total={[executingTasksCount, observingTasksCount]} />
      <TasksList items={items} />
    </div>
  )
}
