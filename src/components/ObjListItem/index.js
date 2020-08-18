import React from "react"
import { Link as LinkItem } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Icon, Button } from "components"

export const ObjListItem = ({
  styles,
  id,
  street,
  number,
  numberOfTasks,
  city,
}) => {
  // console.log(props)
  return styled(styles)(
    <li>
      <LinkItem to={`/objects/${id}`}>
        
        <span>
          <title as="span">
            {street}, {number}
          </title>
          <span>
            {!!numberOfTasks && (
              <>
                <Icon fill="rgb(var(--error))" icon="alarm" />
                Задач: {numberOfTasks}
              </>
            )}
          </span>
        </span>
        <span></span>
        <span>{city}</span>
        <span></span>
      </LinkItem>
      <Button big icon>
        <Icon icon="menu" size={24} />
      </Button>
    </li>
  )
}

ObjListItem.defaultProps = {
  styles: css`
    LinkItem,
    title,
    li,
    span {
      display: grid;
      grid-auto-flow: column;
      align-items: center;
    }

    LinkItem {
      height: 48px;
      grid-template-columns: 5fr 1fr 3fr 2fr auto;
      &:hover title {
        color: rgb(var(--primary));
      }
    }

    li {
      grid-template-columns: 1fr auto;
    }

    title {
      color: rgb(var(--main));
      font-size: 16px;
      font-weight: 600;
    }

    span {
      grid-gap: 8px;
      font-size: 14px;
      line-height: 16px;
      font-weight: normal;
      color: rgba(var(--main), 0.8);
    }

    span:first-child {
      justify-content: start;
      grid-gap: 16px;
    }
  `,
}
