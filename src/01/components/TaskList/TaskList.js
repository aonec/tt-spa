import React from "react"
import styled, { css } from "reshadow/macro"
import { Link as LinkRow } from "react-router-dom"

import { Timeline } from "01/components/Timeline"
import { Timer } from "01/components/Timer"

const style = css`
  item {
    border: 1px solid red;
  }

  LinkRow,
  row {
    display: flex;
    align-items: center;
  }
`

export const TaskList = ({ list = [] }) =>
  styled(style)(
    list.map((t) => {
      const title = t.currentStage?.name ?? t.name
      const name = !!t.currentStage && t.name
      return (
        <item>
          <LinkRow>
            <h4>{title}</h4>
            <name>{name}</name>
          </LinkRow>
          <Timeline {...t} />
          <Timer {...t} />
          <row></row>
        </item>
      )
    })
  )
