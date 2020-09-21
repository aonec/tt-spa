import React from "react"
import styled, { css, use } from "reshadow/macro"

import { useTransformTime } from "hooks"
import { Icon } from "components"

export const Timer = ({
  styles,
  stage,
  closingTime,
  expectedCompletionTime,
  ...props
}) => {
  const stageTime = useTransformTime(stage)
  const finish = useTransformTime(closingTime)
  const diff = useTransformTime(expectedCompletionTime, closingTime)

  if (closingTime)
    return styled(styles)(
      <timer {...props}>
        <Icon icon="ok" fill="rgb(var(--success))" />
        Выполненно за {finish.timeString}{" "}
        <span>
          ({diff.expired ? "-" : "+"}
          {diff.timeString})
        </span>
      </timer>
    )

  return styled(styles)(
    <timer {...props}>
      <Icon icon="timer" />
      Время на этап:{" "}
      <span {...use({ expired: stageTime.expired })}>
        {stageTime.timeString}
      </span>{" "}
      (до {new Date(stage).toLocaleDateString()})
    </timer>
  )
}

Timer.defaultProps = {
  styles: css`
    timer {
      display: flex;
      align-items: center;
    }

    Icon {
      margin-right: 8px;
    }

    span {
      margin: 0 4px;

      &[|expired] {
        color: rgb(var(--error));
        &::before {
          content: "-";
        }
      }
    }
  `,
}
