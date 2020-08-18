import React from "react"
import t from "prop-types"

import icons from "assets/icons/icons.json"

export const Icon = ({
  icon = "",
  size = 16,
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg width={size} height={size} fill={fill} viewBox="0 0 16 16" {...props}>
      <path as="path" d={icons[icon]} />
    </svg>
  )
}

Icon.propTypes = {
  icon: t.oneOf([...Object.keys(icons)].sort((a, b) => a.localeCompare(b)))
    .isRequired,
  size: t.number,
  fill: t.string,
}
