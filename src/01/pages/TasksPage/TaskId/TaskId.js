import React from "react"
import styled from "reshadow/macro"

import { Page } from "01/components/Page"
import { TaksIdHeader } from "01/components/headers/TaskIdHeader"
import { Panel, usePanel } from "01/components/Panel"
import { CommentsBlock, useCommentsBlock } from "01/components/Comments"
import { useTaskId } from "./useTaskId"

export const TaskId = () => {
  const { data, state, dispatch } = useTaskId()
  // const comments = useCommentsBlock(data)
  const panel = usePanel(state, dispatch)
  return styled()(
    <Page>
      <div>bc</div>
      <TaksIdHeader {...data} />
      <Panel {...panel} />
      {/* <CommentsBlock {...comments} /> */}
    </Page>
  )
}
