import React from "react"
import styled, { css } from "reshadow/macro"

import { ImgBlock } from "./ImgBlock"
import { AuthForm } from "./AuthForm"

export const Login = ({ styles, ...props }) => {
  return styled(styles)(
    <main>
      <ImgBlock />
      <AuthForm />
    </main>
  )
}

Login.defaultProps = {
  styles: css`
    main {
      height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      background-color: #12193d;
      color: #fff;
      place-items: center;
    }

    form {
      min-width: 400px;
      margin: 0 auto;
      display: grid;
      grid-gap: 24px;
    }

    h1 {
      font-size: 40px;
      line-height: 48px;
      font-weight: 300;
      margin: 0 auto 32px;
    }

    label {
      display: grid;
      grid-gap: 8px;
      font-size: 14px;
      line-height: 16px;
      font-weight: 500;
    }

    div:first-child {
      display: grid;
      justify-items: center;
    }
    div:last-child {
      margin-top: -32px;
    }

    img:first-child {
      margin-bottom: -32px;
    }
  `,
}
