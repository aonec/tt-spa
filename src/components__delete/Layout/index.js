import React from "react"
import styled, { css } from "reshadow/macro"

import { Logo, Menu } from "components"

export const Layout = ({ styles, children }) => {
  return styled(styles)(
    <layout>
      <header>
        <Logo />
        <Menu />
      </header>
      <main>{children}</main>
    </layout>
  )
}

Layout.defaultProps = {
  styles: css`
    layout {
      height: 100vh;
      display: grid;
      grid-template-columns: 208px 1fr;
      overflow-y: hidden;
      color: rgb(var(--main));
    }

    header {
      background-color: rgb(var(--bg));
    }

    main {
      overflow-y: scroll;
      padding: 56px;
      padding-top: 8px;
      position: relative;
      display: grid;
      grid-gap: 16px;
      align-content: start;

      &::-webkit-scrollbar {
        width: 4px;
        border-radius: 4px;
        background-color: rgba(var(--primary), 0.1);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(var(--primary), 0.6);
      }
    }
  `,
}
