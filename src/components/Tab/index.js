import React from "react"
import { NavLink as TabLink } from "react-router-dom"
import styled, { css } from "reshadow/macro"

export const Tab = ({ styles, children, ...props }) => {
  return styled(styles)(
    <TabLink activeClassName={styles.active} replace {...props}>
      {children}
    </TabLink>
  )
}

Tab.defaultProps = {
  styles: css`
    TabLink {
      padding: 8px;
      position: relative;
      &:hover {
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 2px;
        background-color: transparent;
      }

      &:hover,
      &.active {
        color: rgb(var(--primary));
      }

      &.active::before {
        background-color: rgb(var(--primary));
      }
    }
  `,
}
