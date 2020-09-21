import React from "react"
import { useLocation, Link } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Icon, Timer, Timeline, Device } from "components"

export const TasksListItem = ({
  styles,
  id,
  name,
  address,
  device,
  creationTime,
  expectedCompletionTime,
  closingTime,
  currentStage,
  perpetrator,
  isResponsible,
}) => {
  const { hash } = useLocation()
  return styled(styles)(
    <li>
      <Link to={`/tasks/${id}`}>
        <row>
          <title_item>{currentStage ? currentStage.name : name}</title_item>
          <div>{name}</div>
        </row>
        {isResponsible && (
          <Timeline {...{ expectedCompletionTime, creationTime }} />
        )}
        <row>
          <div>
            <Timer
              stage={currentStage?.expectedCompletionTime}
              closingTime={closingTime}
              expectedCompletionTime={expectedCompletionTime}
            />
            {isResponsible && hash === "#observing" && (
              <span>
                <Icon icon="username2" />
                {perpetrator.name}
              </span>
            )}
          </div>
        </row>
        <row>
          <div>
            <Device device={device} />
            <span>
              <Icon icon="map" />
              {address}
            </span>
          </div>
          <div>
            <span>
              <Icon icon="number" />
              {id}
            </span>
            <span>
              <Icon icon="calendar" />
              {new Date(creationTime).toLocaleString()}
            </span>
          </div>
        </row>
      </Link>
    </li>
  )
}

TasksListItem.defaultProps = {
  styles: css`
    link {
      display: grid;
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;
      color: rgba(var(--main), 0.8);

      &:hover title_item {
        color: rgb(var(--primary));
      }

      & > * {
        pointer-events: none;
      }
    }

    row {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }

    div,
    span {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
    }

    div {
      grid-gap: 16px;
    }
    span {
      grid-gap: 8px;
    }

    title_item {
      margin: 0;
      font-size: 16px;
      line-height: 2em;
      font-weight: 600;
      color: rgb(var(--main));
    }

    span > span,
    row:nth-child(3),
    row:last-child > div:last-child {
      color: rgba(var(--main), 0.6);
    }
  `,
}
