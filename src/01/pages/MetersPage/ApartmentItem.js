import React from "react"
import styled from "reshadow/macro"
import { Link, useRouteMatch } from "react-router-dom"
import { LinkWrap } from "01/components/LinkWrap"
export const ApartmentItem = ({
  id,
  apartmentNumber,
  homeownerName,
  homeownersCount,
  personalAccountNumber,
  status,
  square,
  title,
}) => {
  const { url } = useRouteMatch()
  return styled()`
    item {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns:
        minmax(max-content, 1.5fr)
        repeat(2, minmax(max-content, 1fr));
      align-content: center;
      min-height: 48px;
    }

    h4,
    span {
      align-self: center;
    }

    span {
      opacity: 0.8;
      & + span {
        opacity: 0.6;
      }
    }
  `(
    <item>
      <LinkWrap to={`${url}${id}`}>
        <h4>{title}</h4>
        <span>{homeownerName}</span>
        <span>{personalAccountNumber}</span>
        {/* <span>{square}</span> */}
      </LinkWrap>
    </item>
  )
}
