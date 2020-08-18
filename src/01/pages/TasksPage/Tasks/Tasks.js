import React from "react"
import styled from "reshadow/macro"

import { Page } from "01/components/Page"
import { Tabs } from "01/components/Tabs"
import { List } from "01/components/List"
// import { TasksItem } from "01/components/items/TasksItem"
import { useTasks } from "./useTasks"
export const Tasks = () => {
  const { tabs, taskList } = useTasks()
  return styled()(
    <Page columns="1fr">
      <header_block>
        <h1>Задачи</h1>
      </header_block>
      <Tabs {...tabs} />
      <List {...taskList} />
    </Page>
  )
}
