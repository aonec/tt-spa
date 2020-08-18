import { date } from "01/servises/date"

const info = [
  ["Постановка на учет", "commercialAccountingDate", "date"],
  ["Диаметр", "diameter"],
  ["Окончание срока эксплуотации", "futureCheckingDate", "date"],
  ["Последняя проверка приборов", "lastCheckingDate", "date"],
]

export function createDeviceInfo(device = null) {
  if (!device) return null
  const list = info
    .map(({ 0: title, 1: value, 2: type }) => {
      switch (type) {
        case "date":
          return [title, date(device[value]).short]
        default:
          return [title, device[value]]
      }
    })
    .filter((item) => item[1])
  const title = {
    model: device.model,
    number: device.serialNumber,
  }

  const icon = createIconProps(device)

  return { list, title, icon }
}

function createIconProps({ resource }) {
  const dev = "var(--main-80)"
  const cold = "var(--cold-water)"
  const hot = "var(--hot-water)"
  const size = 24
  switch (resource) {
    case "ColdWaterSupply":
      return { icon: "water", fill: cold, size }
    case "HotWaterSupply":
      return { icon: "water", fill: hot, size }
    case "Heat":
      return { icon: "heat", fill: dev, size }
    default:
      return { icon: "device", fill: dev, size }
  }
}
