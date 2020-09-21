import React from "react"
import styled, { css } from "reshadow/macro"

import { Icon } from "components"

export const Avatar = ({ styles, ...props }) => {
  return styled(styles)(
    <avatar {...props}>
      <Icon icon="username2" />
    </avatar>
  )
}

Avatar.defaultProps = {
  styles: css`
    avatar {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgb(var(--bg));
    }
  `,
}
