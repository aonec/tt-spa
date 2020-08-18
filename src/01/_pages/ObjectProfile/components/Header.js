import React from 'react'
import styled, { css } from 'reshadow/macro'

import { Loader } from '01/components/Loader'

const styles = css`
  h {
    display: grid;
    grid-template-rows: 48px 16px;
    grid-gap: 8px;
    align-items: center;
  }
  h_title {
    font-size: 32px;
  }

  h_subtitle {
    opacity: 0.8;
  }
`

export const Header = React.memo(({ 0: title, 1: subtitle }) =>
  styled(styles)(
    <h>
      <Loader show={!title} size="48">
        <h_title>{title}</h_title>
        <h_subtitle>{subtitle}</h_subtitle>
      </Loader>
    </h>
  )
)
