import React from "react"
import styled, { css } from "reshadow/macro"

import { Loader, Icon } from "01/components"
import * as s from "01/r_comp"

const styles = css`
  h {
    display: grid;
    grid-template-rows: 48px 16px 16px;
    grid-gap: 8px;
    align-items: center;
  }
  h_title {
    font-size: 32px;
  }

  h_name,
  span,
  before {
    opacity: 0.8;
  }

  time_line {
    & span,
    & time {
      opacity: 0.8;
    }

    & span {
      position: relative;
      &::after {
        content: "Время на задачу";
        position: absolute;
        width: max-content;
        left: 0;
        top: -100%;
        margin-top: -8px;
        opacity: 0.6;
      }
    }
  }

  timer,
  time_line {
    & span {
      margin: 0 4px;
      &[|fail] {
        color: var(--error);
        opacity: 1;
        &::before {
          content: "-";
        }
      }
    }
  }

  timer {
    display: inline-flex;
    opacity: 0.6;
  }

  Icon {
    margin-right: 8px;
  }
`

export const Header = React.memo(
  ({ title = "", name = "", timeline = null, timer = null }) => {
    return styled(styles, s.time_line)(
      <h>
        <Loader show={!title} size="48" />
        <h_title as="h1">{title}</h_title>
        {name && (
          <>
            <h_name>{name}</h_name>
            <time_line>
              <line_wrap>
                <line as="span" style={timeline.style} />
              </line_wrap>
              <span>{timeline.timeStr}</span>
              <before>{timeline.before}</before>
            </time_line>
          </>
        )}
        {timer && (
          <timer>
            <Icon {...timer.icon} />
            <timer_text as="span">{timer.text}</timer_text>
            <span>{timer.stage?.timeStr}</span>
            <time>{timer.stage?.before}</time>
          </timer>
        )}
      </h>
    )
  }
)
