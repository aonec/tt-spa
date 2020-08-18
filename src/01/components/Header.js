import React from "react"
import styled, { css } from "reshadow/macro"

export const Header = ({
  styles,
  page,
  title = "Заголовок",
  loading = false,
}) => {
  if (loading) return styled(styles)(<header>loaing</header>)

  switch (page) {
    case "tasks":
      return "tasks"

    default:
      return styled(styles)(
        <header>
          <h1>{title}</h1>
        </header>
      )
  }
}

Header.defaultProps = {
  styles: css`
    header {
      display: grid;
      grid-template-rows: 48px 16px;
      grid-row-gap: 8px;
      align-items: center;
      padding: 8px;
    }
  `,
}
