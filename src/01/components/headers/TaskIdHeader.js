import React from "react"
import styled, { css } from "reshadow/macro"

import { Timeline } from "01/components/Timeline"
import { Timer } from "01/components/Timer"

export const TaksIdHeader = ({
  styles,
  name = null,
  currentStage = {},
  creationTime,
  expectedCompletionTime,
  closingTime,
}) => {
  // ----------loading-------------
  if (!name)
    return styled(styles)(
      <block>
        <h1>Загрузка...</h1>
      </block>
    )

  // ---------create timer------------
  const timer = styled()`
    Timer {
      color: var(--main-60);
    }
  `(
    <Timer
      {...{
        currentStage,
        creationTime,
        expectedCompletionTime,
        closingTime,
      }}
    />
  )
  // ------------archived--------------
  if (closingTime) {
    return styled(styles)(
      <block>
        <h1>{name}</h1>
        {timer}
      </block>
    )
  }

  // -----------create timeline-------------
  const timeline = styled`
    Timeline {
      color: var(--main-80);
    }
  `(
    <Timeline
      {...{
        creationTime,
        expectedCompletionTime,
        closingTime,
      }}
      style={css`
        time::before {
          content: "Время на задачу";
          top: -100%;
          margin-top: -8px;
          color: var(--main-60);
        }
      `}
    />
  )

  // -----------executing, observing-------------
  return styled(styles)(
    <block>
      <h1>{currentStage.name}</h1>
      <name>{name}</name>
      {timeline}
      {timer}
    </block>
  )
}

TaksIdHeader.defaultProps = {
  styles: css`
    block {
      grid-column: 1 / -1;
      display: grid;
      grid-template-rows: 48px 16px;
      grid-gap: 8px;
      align-items: center;
      padding: 8px;
    }
  `,
}
