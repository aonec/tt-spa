import React from "react"
import styled, { css } from "reshadow/macro"

import logo from "assets/svg/logo.svg"

export const Logo = ({ styles, ...props }) =>
  styled(styles)(
    <logo {...props}>
      <img src={logo} alt="logo TT" />
      <b>TT</b> Management
    </logo>
  )

Logo.defaultProps = {
  styles: css`
    logo {
      display: flex;
      align-items: center;
      padding: 8px 0;
      padding-left: 12px;
      margin-top: 8px;
      margin-bottom: 16px;
    }

    b {
      margin-left: 12px;
      margin-right: 4px;
      font-weight: 500;
    }
  `,
}
