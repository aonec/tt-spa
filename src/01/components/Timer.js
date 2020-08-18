import React from "react"
import styled, { css, use } from "reshadow/macro"

import { formatTime, date } from "01/servises/date"
import { Icon } from "01/components/Icon"

export const Timer = ({
  styles,
  currentStage,
  creationTime,
  expectedCompletionTime,
  closingTime,
  ...props
}) => {
  if (!creationTime) return null
  if (closingTime) {
    const diffTime = new Date(expectedCompletionTime) - new Date(creationTime)
    const diff = formatTime(diffTime)
    const finalTime = new Date(creationTime) - new Date(closingTime)
    const final = formatTime(finalTime)

    return styled(styles)`
      Icon {
        color: var(--success);
      }
    `(
      <time {...props}>
        <Icon icon="ok" />
        Выполненно за: <span>{final.str}</span>({diff.fail ? "-" : "+"}
        {diff.str})
      </time>
    )
  }

  const stageTime = new Date(currentStage?.expectedCompletionTime) - Date.now()
  const stage = formatTime(stageTime)
  const before = date(currentStage?.expectedCompletionTime).short
  return styled(styles)(
    <time {...props}>
      <Icon icon="timer" />
      Время на этап:
      <span {...use({ fail: stage.fail })}>{stage.str}</span>
      (до {before})
    </time>
  )
}

Timer.defaultProps = {
  styles: css`
    time {
      display: inline-flex;
      align-items: center;
    }
    Icon {
      margin-right: 8px;
    }

    span {
      padding: 0 4px;

      &[|fail] {
        color: var(--error);
        &::before {
          content: "-";
        }
      }
    }
  `,
}
