import React from "react"
import { Link as LinkRow } from "react-router-dom"
import styled, { css } from "reshadow/macro"
import { Timeline, Timer, Device, Icon, Loader, Empty } from "components"

export const TasksList = ({ styles, loading, items = [] }) => {
  if (loading) return <Loader size={36} />
  if (!items.length) return <Empty text="Список задач пуст" />
  return items.map(
    ({
      id,
      name,
      currentStage,
      isResponsible,
      expectedCompletionTime,
      creationTime,
      closingTime,
      device,
      address,
    }) =>
      styled(styles)(
        <item key={id}>
          <LinkRow
            to={{
              pathname: "/tasks/" + id,
              state: {
                id,
                name,
                currentStage,
                expectedCompletionTime,
                creationTime,
              },
            }}
          >
            <h4>{currentStage ? currentStage.name : name}</h4>
            <span>{currentStage && name}</span>
          </LinkRow>
          {isResponsible && (
            <Timeline {...{ expectedCompletionTime, creationTime }} />
          )}
          <row>
            <Timer
              stage={currentStage?.expectedCompletionTime}
              closingTime={closingTime}
              expectedCompletionTime={expectedCompletionTime}
            />
          </row>
          <row>
            <Device device={device} />
            <span>
              <Icon icon="map" />
              {address}
            </span>
            <span></span>
            <span>
              <Icon icon="number" />
              {id}
            </span>
            <span>
              <Icon icon="calendar" />
              {new Date(creationTime).toLocaleString()}
            </span>
          </row>
        </item>
      )
  )
}

TasksList.defaultProps = {
  styles: css`
    item {
      font-size: 14px;
    }

    LinkRow {
      display: flex;
      align-items: center;
      & > span {
        opacity: 0.8;
      }
      &:hover {
        color: rgb(var(--primary));
      }
    }

    h4 {
      margin: 0;
      margin-right: auto;
      font-size: 16px;
      line-height: 2em;
    }

    Timer {
      opacity: 0.6;
    }

    row,
    row > span {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
    }

    row {
      margin-top: 8px;
      grid-gap: 16px;
      grid-template-columns: auto 1fr;
      &:last-child {
        opacity: 0.8;
        & span:nth-child(n + 3) {
          opacity: 0.6;
        }
      }
    }

    row > span {
      grid-gap: 8px;
      justify-self: start;
    }
  `,
}
