import React from "react"
import styled, { css } from "reshadow/macro"

export const Label = ({ styles, labelText, children, ...props }) => {
  return styled(styles)(
    <label {...props}>
      <span>{labelText}</span>
      {children}
    </label>
  )
}

Label.defaultProps = {
  styles: css`
    label {
      display: grid;
      grid-gap: 8px;
    }

    span {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.6;
    }
  `,
}
