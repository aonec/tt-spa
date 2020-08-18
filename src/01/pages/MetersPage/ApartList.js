import React from "react"
import styled, { css } from "reshadow/macro"
import { LinkWrap } from "01/components/LinkWrap"

export const ApartList = React.memo(
  ({ styles, list = [], loading = false, message = "" }) => {
    if (loading) return "loading"
    if (message) return message

    return styled(styles)(
      list.map(
        ({
          id,
          apartmentNumber,
          homeownerName,
          homeownersCount,
          personalAccountNumber,
          status,
          square,
          title,
          url,
        }) => (
          <item key={id}>
            <LinkWrap to={url}>
              <h4>{title}</h4>
              <span>{homeownerName}</span>
              <span>{personalAccountNumber}</span>
            </LinkWrap>
          </item>
        )
      )
    )
  }
)

ApartList.defaultProps = {
  styles: css`
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
  `,
}
