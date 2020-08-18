import React from "react"
import styled, { css } from "reshadow/macro"
import { Link as MyLink } from "react-router-dom"
import { Timer } from "components"

export const EventItem = ({
  styles,
  name,
  currentStage,
  closingTime,
  expectedCompletionTime,
  id,
}) => {
  return styled(styles)(
    <event>
      <MyLink to={"/tasks/" + id}>
        <h5>{currentStage ? currentStage.name : name}</h5>
        {currentStage && <span>{name}</span>}
      </MyLink>
      <Timer
        stage={currentStage?.expectedCompletionTime}
        closingTime={closingTime}
        expectedCompletionTime={expectedCompletionTime}
      />
    </event>
  )
}

EventItem.defaultProps = {
  styles: css`
    MyLink,
    event {
      display: grid;
      grid-gap: 8px;
    }

    event {
      font-size: 12px;
      padding: 8px;
    }

    h5 {
      font-size: 14px;
      margin: 0;
    }

    span {
      opacity: 0.45;
    }

    Timer {
      opacity: 0.6;
    }

    MyLink {
      &:hover {
        color: rgb(var(--primary));
      }
    }
  `,
}
