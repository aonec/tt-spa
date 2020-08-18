import React from "react"
// eslint-disable-next-line
import { Link } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Icon } from "01/components/Icon"
import { date } from "01/servises/date"
import { Timeline } from "01/components/Timeline"
import { Timer } from "01/components/Timer"
import { Device } from "01/components/Device"

export const TasksItem = ({
  styles,
  id,
  name,
  currentStage,
  address,
  creationTime,
  expectedCompletionTime,
  closingTime,
  device,
  path,
}) => {
  return styled(styles)(
    <item>
      <header as="Link" to={path + id}>
        <h4>{currentStage ? currentStage.name : name}</h4>
        <name>{currentStage && name}</name>
      </header>
      <Timeline {...{ creationTime, expectedCompletionTime, closingTime }} />
      <row>
        <Timer
          {...{
            creationTime,
            expectedCompletionTime,
            closingTime,
            currentStage,
          }}
        />
        {/* <span>
          <Icon icon="username2" />
          perpetrator
        </span> */}
      </row>
      <row>
        <Device device={device ?? {}} />
        <span>
          <Icon icon="map" />
          {address}
        </span>
        <span>
          <Icon icon="number" />
          {id}
        </span>
        <span>
          <Icon icon="calendar" />
          {date(creationTime).full}
        </span>
      </row>
    </item>
  )
}

TasksItem.defaultProps = {
  styles: css`
    item {
      font-size: 14px;
      margin-bottom: 16px;
      padding: 8px;
      grid-column: 1/ -1;
    }

    timer,
    span,
    row,
    header,
    timeline {
      display: flex;
      align-items: center;
    }

    row {
      margin-top: 8px;
      & > *:not(:last-child) {
        margin-right: 16px;
      }
    }

    header,
    timeline {
      justify-content: space-between;
    }
    header {
      &:hover {
        color: var(--primary-100);
        & name {
          color: inherit;
        }
      }
    }

    Icon {
      margin-right: 8px;
    }

    span:nth-last-child(2) {
      margin-left: auto;
    }

    Timeline,
    row,
    name {
      color: var(--main-80);
    }

    row > span:nth-last-child(2),
    row > span:nth-last-child(2) + span,
    Timer,
    Timer + span {
      color: var(--main-60);
    }
  `,
}
