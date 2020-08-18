import React from "react"
import { useRouteMatch } from "react-router-dom"
import styled, { use } from "reshadow/macro"

import { title_page } from "styles/helper"
import {
  Comments,
  Stages,
  Grid,
  Breadcrumbs,
  Documents,
  Loader,
} from "components"
import { TaskIdContext } from "./contex"
import { Header } from "./Header"
import { Panel } from "./Panel"
import { InfoList } from "./InfoList"
import { DeviceList } from "./DeviceList"
import useTasksIdState from "./useTasksIdState"
import { StagesBlock } from "./StagesBlock"

export const TaskId = () => {
  const { url } = useRouteMatch()
  const [state, dispatch] = useTasksIdState()

  if (state.loading.initial) return <Loader size={48} center />

  return styled(title_page)(
    <TaskIdContext.Provider value={[state, dispatch]}>
      <>
        <Breadcrumbs />
        <Header />
        <Panel />
        <Documents {...{ state, dispatch }} />
        <Grid
          left={
            <>
              <Comments comments={state.comments} />
              <InfoList />
              <DeviceList />
            </>
          }
          right={<StagesBlock />}
        />
      </>
    </TaskIdContext.Provider>
  )
}
