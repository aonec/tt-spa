import React from "react"
import styled, { css } from "reshadow/macro"

export const Grid = ({ styles, left, right }) => {
  return styled(styles)(
    <block>
      <div>{left}</div>
      <div>{right}</div>
    </block>
  )
}

Grid.defaultProps = {
  styles: css`
    block,
    div {
      display: grid;
      grid-row-gap: 16px;
      align-items: start;
    }

    block {
      grid-column-gap: 32px;
      grid-template-columns: 7fr minmax(240px, 5fr);
    }
  `,
}
