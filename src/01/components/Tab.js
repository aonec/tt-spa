import React from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "reshadow/macro"

export const Tab = ({ styles, name, ...props }) =>
  styled(styles)(
    <NavLink to="/" activeClassName={styles.active} {...props}>
      {name}
    </NavLink>
  )

Tab.defaultProps = {
  styles: css`
    .active {
      color: var(--primary-100);
      &::before {
        border-color: initial;
      }
    }
  `,
}
