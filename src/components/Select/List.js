import React, { useContext } from "react"
import styled, { css, use } from "reshadow/macro"

import { Icon } from "components"
import { SelectContext } from "./context"

export const List = ({ styles }) => {
  const { state, dispatch } = useContext(SelectContext)
  const { items, focus } = state

  return styled(styles)`
    ul {
      --scroll: ${items.length > 5 ? "scroll" : "hidden"};
    }
  `(
    <ul>
      {!items.length && <empty as="li">Данных нет</empty>}
      {items.map(({ name, id, icon, checked, executingTaskCount }, i) => (
        <li
          data-option
          key={id}
          {...use({ focus: focus === i, checked })}
          onClick={(e) =>
            dispatch({ type: "click_check", payload: { id, index: i } })
          }
        >
          <span>{icon && <Icon icon={icon} />}</span>
          {name}
          {executingTaskCount && (
            <span {...use({ caption: true })}>
              (задач в работе: {executingTaskCount})
            </span>
          )}
          <check as="Icon" icon="ok" />
        </li>
      ))}
    </ul>
  )
}

List.defaultProps = {
  styles: css`
    ul {
      outline: 0;
      position: absolute;
      margin-top: 1px;
      min-width: 100%;
      background-color: #fff;
      color: var(--color);
      z-index: 50;
      max-height: var(--max-height);
      transition: var(--transition);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);

      overflow-y: var(--scroll);

      &::-webkit-scrollbar {
        width: 4px;
        border-radius: 4px;
        background-color: rgba(var(--primary), 0.1);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(var(--primary), 0.6);
      }
    }

    li {
      height: var(--height);
      padding: 0 var(--padding);
      display: grid;
      grid-template-columns: repeat(2, auto) 1fr;
      grid-gap: 8px;
      align-items: center;
      position: relative;

      &:not(:last-child)::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: var(--padding);
        right: var(--padding);
        display: block;
        height: 1px;
        background-color: rgb(var(--frame));
      }

      &[|checked],
      &[|focus],
      &:hover {
        background-color: var(--active-color);
        color: #fff;
      }

      &[|checked] > check {
        visibility: visible;
      }
    }

    span {
      display: inherit;
      &[|caption] {
        opacity: 0.4;
      }
    }

    check {
      grid-column: -1;
      visibility: hidden;
    }

    empty {
      min-height: calc(2 * var(--height));
      display: grid;
      place-content: center;
    }
  `,
}
