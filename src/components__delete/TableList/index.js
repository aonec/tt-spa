import React from "react"
import { Link as LinkValue } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { title_section } from "styles/helper"

export const TableList = ({ styles, children }) => {
  return styled(styles, title_section)(
    <ul>
      {children
        ?.filter((item) => item)
        .map(({ title, value, ...props }) => (
          <li key={title}>
            <title as="span">{title}</title>
            {props.to ? (
              <LinkValue {...props}>{value}</LinkValue>
            ) : (
              <value as="span">{value}</value>
            )}
          </li>
        ))}
    </ul>
  )
}

TableList.defaultProps = {
  styles: css`
    ul {
      font-size: 14px;
    }

    li {
      display: grid;
      grid-template-columns: 3fr 5fr;
    }

    title,
    value,
    LinkValue {
      padding: 16px 8px;
    }

    LinkValue {
      font-weight: 500;
      color: rgb(var(--main));
      &:hover {
        color: rgb(var(--primary));
      }
    }

    title {
      color: rgba(var(--main), 0.6);
    }

    value {
      color: rgba(var(--main), 0.8);
    }
  `,
}
