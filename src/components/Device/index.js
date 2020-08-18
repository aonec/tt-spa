import React from "react"
import styled, { css } from "reshadow/macro"

import { Icon } from "components"

export const Device = ({ styles, size, device, ...props }) => {
  if (!device) return null
  const { model, serialNumber, resource } = device
  return styled(styles)(
    <device as="span" {...props}>
      <Icon size={size} {...getDeviceIconProps(resource)} />
      {model}
      <span>({serialNumber})</span>
    </device>
  )
}

Device.defaultProps = {
  styles: css`
    device {
      display: flex;
      align-items: center;
    }

    Icon {
      margin-right: 8px;
    }

    span {
      opacity: 0.6;
      margin-left: 4px;
    }
  `,
}

export const getDeviceIconProps = (resource) => {
  const cold = "var(--cold-water)"
  const hot = "var(--hot-water)"
  const def = "rgba(var(--main),.8)"

  switch (resource) {
    case "ColdWaterSupply":
      return { icon: "water", fill: cold }
    case "HotWaterSupply":
      return { icon: "water", fill: hot }
    case "Heat":
      return { icon: "heat", fill: def }
    default:
      return { icon: "device", fill: def }
  }
}
