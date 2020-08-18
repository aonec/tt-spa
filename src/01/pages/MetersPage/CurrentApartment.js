import React from "react"
import styled, { css } from "reshadow/macro"
import { Route } from "react-router-dom"
import { InfoItem } from "01/components/items"

export const CurrentApartment = ({
  styles,
  housingStock = {},
  apartmentNumber = "",
  title,
  infoList = [],
}) => {
  return styled(styles)(
    <Route path="/meters/(\\d+)">
      <top>
        <h2>{title}</h2>
      </top>
      <info_block>
        <InfoList list={infoList} />
        <block>block</block>
      </info_block>
    </Route>
  )
}

CurrentApartment.defaultProps = {
  styles: css`
    top {
      height: 48px;
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      & > h2 {
        margin: 0;
      }
    }
    info_block {
      grid-column: 1/ -1;
      display: grid;
      grid-row-gap: 8px;
      grid-column-gap: 16px;
      padding: 16px;
    }

    info_block {
      grid-template-columns: 1fr 1fr;
      box-shadow: var(--shadow);
    }

    info_item {
      grid-column: 2 / span 1;
      min-height: 48px;
      padding: 8px;
    }
  `,
}

const InfoList = React.memo(({ list = [] }) => {
  return (
    <ul>
      {list.map(({ 0: title, 1: text, 2: url }) => (
        <InfoItem key={title} {...{ title, text, url }} />
      ))}
    </ul>
  )
})
