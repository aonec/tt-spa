import React from "react"
import styled from "reshadow/macro"
import t from "prop-types"

import { LinkWrap } from "01/components/LinkWrap"

export const InfoItem = React.memo(({ title, text, url }) =>
  styled`
    info_item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 48px;
      align-items: center;
      border-bottom: 1px solid var(--frame);
      color: var(--main-80);
    }
    LinkWrap {
      color: var(--main-100);
    }
    LinkWrap > span:last-child {
      font-weight: 500;
    }
    span {
      padding: 8px 16px;
    }
    span:first-of-type {
      color: var(--main-60);
    }
  `(
    <info_item>
      <LinkWrap to={url}>
        <span>{title}</span>
        <span>{text}</span>
      </LinkWrap>
    </info_item>
  )
)

InfoItem.propTypes = {
  title: t.string.isRequired,
  text: t.oneOfType([t.string, t.number]).isRequired,
  url: t.string,
}
