import React from "react"
import { Link } from "react-router-dom"

import styled from "reshadow/macro"

export const LinkWrap = ({ children, to, ...props }) =>
  to ? (
    styled`
      Link {
        display: contents;
        &:hover {
          color: var(--primary-100);
        }
      }
    `(
      <Link to={to} {...props}>
        {children}
      </Link>
    )
  ) : (
    <>{children}</>
  )
