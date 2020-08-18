import React, { useContext } from "react"
import styled, { css } from "reshadow/macro"
import { SelectContext } from "./context"

import { Icon } from "components"

export const Multiple = ({ styles }) => {
  const { state, dispatch } = useContext(SelectContext)
  const { items, multiple, placeholder } = state
  if (!multiple) return null
  const multiList = items.filter((i) => i.checked)
  if (!multiList.length) {
    return styled(styles)(<ph>{placeholder}</ph>)
  }
  return styled(styles)(
    <ul data-field>
      {multiList.map(({ name, id }, i) => (
        <li
          data-option
          key={id}
          onClick={(e) => {
            e.stopPropagation()
            dispatch({ type: "click_check", payload: { id, index: i } })
          }}
        >
          {name} <Icon icon="close" />
        </li>
      ))}
    </ul>
  )
}

Multiple.defaultProps = {
  styles: css`
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-self: start;
      &:empty::before {
        color: rgba(var(--main), 0.4);
      }
    }

    li {
      display: inline-flex;
      align-items: center;
      background-color: rgb(var(--main));
      line-height: 24px;
      padding: 0 8px;
      border-radius: 2px;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      transition: var(--transition);
      margin: 2px;
      pointer-events: all;
      &:hover {
        background-color: var(--active-color);
      }

      & > * {
        pointer-events: none;
      }
    }

    Icon {
      margin-left: 8px;
    }

    ph {
      margin-left: 8px;
      color: rgba(var(--main), 0.4);
      pointer-events: none;
    }
  `,
}
