import React from "react"
import { Link as LinkValue } from "react-router-dom"
import styled, { css } from "reshadow/macro"

export const SimpleListItem = ({ styles, title, value, to }) =>
  styled(styles)(
    <li>
      <span>{title}</span>
      {to ? <LinkValue to={to}>{value}</LinkValue> : <span>{value}</span>}
    </li>
  )

SimpleListItem.defaultProps = {
  styles: css`
    li {
      display: grid;
      grid-template-columns: 3fr 5fr;
      border-bottom: 1px solid rgb(var(--frame));
    }
    span,
    LinkValue {
      font-size: 14px;
      line-height: 16px;
      padding: 16px 8px;
    }

    span {
      &:first-child {
        color: rgba(var(--main), 0.6);
      }
      &:last-child {
        color: rgba(var(--main), 0.8);
      }
    }

    LinkValue {
      font-weight: 500;
      color: rgba(var(--main));
      &:hover {
        color: rgb(var(--primary));
      }
    }
  `,
}
