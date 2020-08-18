import React from "react"
import styled from "reshadow/macro"
import t from "prop-types"

import icons from "01/assets/icons.json"

export const Icon = ({ size = 16, icon = "", ...props }) =>
  styled()`
    svg {
      width: ${size + "px"};
      height: ${size + "px"};
    }
  `(
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path as="path" clipRule="evenodd" fillRule="evenodd" d={icons[icon]} />
    </svg>
  )

Icon.propTypes = {
  icon: t.oneOf([...Object.keys(icons).sort((a, b) => a.localeCompare(b))])
    .isRequired,
  size: t.string,
  fill: t.string,
}
