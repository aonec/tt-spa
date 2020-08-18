import React from "react"
// eslint-disable-next-line
import { Link } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Icon } from "01/components/Icon"

export const ObjectItem = React.memo(
  ({ styles, city, id, number, numberOfTasks, street, path = "/object/" }) =>
    styled(styles)(
      <item>
        <link as="Link" to={path + id}>
          <h4>
            {street}, {number}
          </h4>
          <span>
            {!!numberOfTasks && (
              <>
                <Icon icon="alarm" />
                Задач: {numberOfTasks}
              </>
            )}
          </span>
          <span>{city}</span>
          <span>mnogord</span>
        </link>
      </item>
    )
)

ObjectItem.defaultProps = {
  styles: css`
    item {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      grid-column: 1 / -1;
    }

    link {
      flex-grow: 1;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: inherit;
      min-height: 48px;
      padding: 8px;

      &:hover {
        color: var(--primary-100);
        & span {
          color: inherit;
        }
      }
    }

    span {
      display: flex;
    }

    span:first-of-type {
      color: var(--main-80);
    }
    span:nth-last-child(1),
    span:nth-last-child(2) {
      color: var(--main-60);
    }

    Icon {
      margin-right: 8px;
      color: var(--error);
    }
  `,
}
