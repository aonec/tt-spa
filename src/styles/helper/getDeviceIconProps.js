export const getDeviceIconProps = (device) => {
  if (!device) return {}
  const cold = "var(--cold-water)"
  const hot = "var(--hot-water)"

  switch (device.resource) {
    case "ColdWaterSupply":
      return { icon: "water", fill: cold }
    case "HotWaterSupply":
      return { icon: "water", fill: hot }
    case "Heat":
      return { icon: "heat" }
    default:
      return { icon: "device" }
  }
}
