import React from "react"
import styled, { css, use } from "reshadow/macro"

import { Icon } from "components"

export const Loader = ({ styles, size, center, ...props }) => {
  return styled(styles)(
    <div {...props} {...use({ center })}>
      <Icon icon="replacement" size={size} />
    </div>
  )
}

Loader.defaultProps = {
  styles: css`
    div {
      display: grid;
      place-content: center;

      &[|center] {
        height: 100vh;
      }
    }
    @keyframes spin {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }

    Icon {
      animation: spin 1000ms linear infinite;
    }
  `,
}
