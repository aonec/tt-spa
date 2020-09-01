import React from "react"
import styled from "reshadow/macro"
import { TasksItem } from "01/components/items/TasksItem"
import { page } from "01/r_comp"
import { useTasksPage } from "./useTasksPage"
import { HeaderBlock } from "01/components/HeaderBlock"
import { TabsBlock } from "01/components/TabsBlock"

export const TasksPage = () => {
  const { items, loading } = useTasksPage()
  return styled(page)(
    <>
      <HeaderBlock title="Задачи" />
      <TabsBlock />
      {loading && <loader size={32} data-center as="Icon" icon="replacement" />}
      {items?.length === 0 && "empty"}
      {items?.map((item) => (
        <TasksItem key={item.id} {...item} path="/task/" />
      ))}
    </>
  )
}
