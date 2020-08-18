import React from "react"
import styled, { css } from "reshadow/macro"
import { useHistory, useRouteMatch } from "react-router-dom"
import { Loader } from "01/components"

const styles = css`
  apart {
    display: grid;
    grid-template-columns: repeat(2, 1fr) repeat(2, 0.5fr);
    align-items: center;
    height: 48px;
    padding: 8px;
    cursor: pointer;
    &:hover {
      color: var(--primary-100);
      box-shadow: var(--shadow);
    }
  }

  apart_owner {
    opacity: 0.8;
  }
  apart_number,
  apart_square {
    opacity: 0.6;
  }
`

export const Apartments = ({ loading = null, items = [] }) => {
  const { push } = useHistory()
  const { url } = useRouteMatch()
  if (loading) return <Loader show={true} size="32" />
  return styled(styles)(
    items.map(({ title, id, owner, number, square }) => (
      <apart key={id} onClick={() => push(`${url}/${id}`)}>
        <apart_title as="h4">{title}</apart_title>
        <apart_owner>{owner}</apart_owner>
        <apart_number>{number}</apart_number>
        <apart_square>
          {square ?? "-"} м<sup>2</sup>
        </apart_square>
      </apart>
    ))
  )
}
// homeownerName,personalAccountNumber,square
