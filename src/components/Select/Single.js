import React, { useContext } from "react"
import styled, { css } from "reshadow/macro"

import { Icon } from "components"
import { SelectContext } from "./context"

export const Single = ({ styles }) => {
  const { state } = useContext(SelectContext)
  const { items, placeholder, multiple } = state
  const item = items.find((item) => item.checked)

  if (multiple) return null
  if (!item) return styled(styles)(<ph>{placeholder}</ph>)
  return styled(styles)(
    <single>
      <span>{item.icon && <Icon icon={item.icon} />}</span>
      {item.name}
    </single>
  )
}

Single.defaultProps = {
  styles: css`
    ph {
      margin-left: 8px;
      color: rgba(var(--main), 0.4);
      pointer-events: none;
    }

    single {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 8px;
      justify-content: start;
      align-items: center;
      pointer-events: none;
    }

    span {
      display: inherit;
    }
  `,
}
