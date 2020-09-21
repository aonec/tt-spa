import React from "react"
import styled, { css } from "reshadow/macro"

import logo_text from "assets/svg/logo_text.svg"
import login_img from "assets/svg/login_img.svg"

export const ImgBlock = ({ styles }) => {
  return styled(styles)(
    <div>
      <img src={logo_text} alt="TT Management" />
      <img src={login_img} alt="aplication" />
    </div>
  )
}

ImgBlock.defaultProps = {
  styles: css`
    div {
      display: grid;
      place-items: center;
    }
  `,
}
