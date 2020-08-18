import React from "react"
import styled from "reshadow/macro"

export const Page = ({ children, columns = "8fr 5fr", ...props }) =>
  styled()`
    page {
      display: grid;
      grid-template-columns: ${columns};
      grid-gap: 16px;
      align-content: start;
      padding: 16px 56px;
      height: 100vh;
      overflow-y: scroll;
    }
  `(<page {...props}>{children}</page>)
