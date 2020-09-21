import React from "react"
import { useLocation } from "react-router-dom"
import styled from "reshadow/macro"
import { tabs } from "styles/helper"
import { Tab } from "components"

export const TasksTabs = ({ executingTasksCount, observingTasksCount }) => {
  const { pathname, search } = useLocation()

  return styled(tabs)(
    <tabs>
      <Tab
        to={{ pathname, search: "grouptype=executing" }}
        isActive={() => search.includes("executing")}
      >
        К исполнению {!!executingTasksCount && `(${executingTasksCount})`}
      </Tab>
      <Tab
        to={{ pathname, search: "grouptype=observing" }}
        isActive={() => search.includes("observing")}
      >
        Наблюдаемые {!!observingTasksCount && `(${observingTasksCount})`}
      </Tab>
      <Tab
        to={{ pathname, search: "grouptype=archived" }}
        isActive={() => search.includes("archived")}
      >
        Архив
      </Tab>
    </tabs>
  )
}
