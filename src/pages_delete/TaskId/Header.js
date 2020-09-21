import React, { useContext } from "react"
import styled, { css } from "reshadow/macro"

import { title_page } from "styles/helper"
import { Timeline, Timer, Loader } from "components"
import { TaskIdContext } from "./contex"

export const Header = ({ styles }) => {
  const [
    { name, currentStage, creationTime, expectedCompletionTime, closingTime },
  ] = useContext(TaskIdContext)

  if (!name) return <Loader size={32} />
  return styled(title_page, styles)(
    <header as="div">
      <title_page>{currentStage ? currentStage.name : name}</title_page>
      {currentStage && <subtitle>{name}</subtitle>}
      {currentStage && (
        <Timeline {...{ creationTime, expectedCompletionTime }} />
      )}
      <span>
        <Timer
          stage={currentStage?.expectedCompletionTime}
          closingTime={closingTime}
          expectedCompletionTime={expectedCompletionTime}
        />
      </span>
    </header>
  )
}

Header.defaultProps = {
  styles: css`
    header {
      font-size: 14px;
      display: grid;
      grid-gap: 8px;
    }

    Timer {
      color: rgba(var(--main), 0.6);
    }
  `,
}
