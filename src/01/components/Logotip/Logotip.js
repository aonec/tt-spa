import React from "react"
import styled from "reshadow/macro"
import logo from "01/assets/svg/logo.svg"

export const Logotip = (props) =>
  styled()`
    logotip {
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 16px;
      line-height: 2;
    }

    span {
      font-weight: 500;
      margin: 0 4px 0 8px;
    }
  `(
    <logotip {...props}>
      <img src={logo} alt="logotip" />
      <span>TT</span>
      Management
    </logotip>
  )
