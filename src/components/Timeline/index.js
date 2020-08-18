import React from "react"
import styled, { css, use } from "reshadow/macro"

import { useTransformTime } from "hooks"

export const Timeline = ({
  styles,
  expectedCompletionTime,
  creationTime,
  ...props
}) => {
  const { timeString, expired } = useTransformTime(expectedCompletionTime)
  if (!expectedCompletionTime) return null
  const { width, color } = getLineProps(creationTime, expectedCompletionTime)
  return styled(styles)`
    progress {
      &::before {
        width: ${width + "%"};
        background-color: ${`rgb(var(--${color}))`};
      }
    }
  `(
    <timeline {...props}>
      <progress as="div" />
      <div>
        <span {...use({ expired })}>{timeString}</span> (до{" "}
        {new Date(expectedCompletionTime).toLocaleDateString()})
      </div>
    </timeline>
  )
}

Timeline.defaultProps = {
  styles: css`
    timeline {
      display: grid;
      align-items: center;
      grid-gap: 8px;
      grid-template-columns: 1fr auto;
    }

    progress {
      position: relative;
      overflow: hidden;
      height: 4px;
      border-radius: 4px;
      background-color: rgb(var(--bg));

      &::before {
        content: "";
        position: absolute;
        border-radius: inherit;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
      }
    }
    div {
      opacity: 0.8;
    }

    span[|expired] {
      color: rgb(var(--error));
      &::before {
        content: "-";
      }
    }
  `,
}

function getLineProps(start, finish) {
  const percent =
    Math.abs(
      (Date.now() - new Date(start)) / (new Date(finish) - new Date(start))
    ) * 100
  const width = percent >= 100 ? 100 : percent
  const color = percent < 30 ? "success" : percent < 60 ? "warning" : "error"
  return { width, color }
}
