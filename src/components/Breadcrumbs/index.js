import React from "react"
import { useHistory } from "react-router-dom"
import styled, { css } from "reshadow/macro"

import { Icon } from "components"

export const Breadcrumbs = ({ styles }) => {
  const { goBack } = useHistory()
  return styled(styles)(
    <div>
      <back onClick={() => goBack()}>
        <Icon icon="down" />
        Назад
      </back>
    </div>
  )
}

Breadcrumbs.defaultProps = {
  styles: css`
    back {
      border-radius: 1px solid red;
      display: inline-grid;
      grid-template-columns: auto auto;
      grid-gap: 8px;
      align-items: center;
      justify-content: start;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        color: rgb(var(--primary));
      }
    }

    Icon {
      transform: rotate(90deg);
    }
  `,
}
