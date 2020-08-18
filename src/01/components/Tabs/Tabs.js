import { NavLink } from "react-router-dom"
import React from "react"
import t from "prop-types"
import styled, { css } from "reshadow/macro"

const style = css`
  div {
    border-bottom: 1px solid var(--frame);
    display: flex;
    font-weight: 600;
    font-size: 16px;
    line-height: 2em;
    & > *:not(:last-child) {
      margin-right: 16px;
    }

    & > * {
      padding: 8px;
      position: relative;
      &:hover {
        color: var(--primary-100);
      }

      &::before {
        content: "";
        position: absolute;
        border-top: 2px solid transparent;
        border-radius: 4px 4px 0 0;
        bottom: -1px;
        left: 0;
        right: 0;
      }
    }
  }
  .active {
    color: var(--primary-100);
    &::before {
      border-color: inherit;
    }
  }
`

export const Tabs = React.memo(({ children = [], ...props }) => {
  return styled(style)(
    <div {...props}>
      {children.map(({ name, to, ...rest }, i) => (
        <NavLink key={name} to={to} replace activeClassName={style.active}>
          {name}
        </NavLink>
      ))}
    </div>
  )
})

Tabs.propTypes = {
  children: t.arrayOf(
    t.shape({
      name: t.string.isRequired,
      to: t.string.isRequired,
    })
  ).isRequired,
}
