import React from "react"
import { Redirect } from "react-router-dom"
import styled from "reshadow/macro"

import { title_page, tabs } from "styles/helper"

import { TasksList } from "./TasksList"

import useTasksState from "./useTasksState"

import { TasksTabs } from "./TasksTabs"

export const Tasks = ({ location, match }) => {
  const { search } = location
  const {
    loading,
    items,
    executingTasksCount,
    observingTasksCount,
  } = useTasksState()
  if (!search) return <Redirect to={match.url + "?grouptype=executing"} />
  return styled(title_page, tabs)(
    <>
      <title_page as="h1">Задачи</title_page>
      <TasksTabs {...{ executingTasksCount, observingTasksCount }} />
      <TasksList items={items} loading={loading} />
    </>
  )
}
