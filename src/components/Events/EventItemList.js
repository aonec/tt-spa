import React from "react"
import { Link as LinkItem } from "react-router-dom"
import styled, { css } from "reshadow/macro"

export const EventItemList = ({ styles }) => {
  return styled(styles)(
    <li>
      <LinkItem></LinkItem>
    </li>
  )
}

EventItemList.defalultProps = {
  styles: css`
    LinkItem {
    }
  `,
}
