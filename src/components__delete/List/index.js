import React from "react"
import styled, { css } from "reshadow/macro"

export const List = ({ styles, children, loading, ...props }) => {
  return styled(styles)(
    <list as="ul" {...props}>
      {loading && "loading"}
      {children}
    </list>
  )
}

List.defaultProps = {
  styles: css`
    list {
      display: grid;
      grid-gap: 16px;
    }
  `,
}
