import React from "react"
import { Link } from "react-router-dom"

import { useTasks } from "./useTasks"
import { Tabs, Loader, TaskList } from "01/components"

export const Tasks = () => {
  const { loading, taskList, tabs } = useTasks()
  return (
    <>
      <h1>Задачи</h1>
      <Tabs>{tabs}</Tabs>
      <Loader show={loading} size="32" />
      <TaskList list={taskList} />
    </>
  )
}
