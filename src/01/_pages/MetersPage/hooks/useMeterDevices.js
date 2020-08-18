import React from "react"

export const useMeterDevices = ({ meterDevices = {} }) => {
  const [state, dispatch] = React.useReducer(meterReducer, {})
  console.log("itsms", meterDevices)
  const { items = [] } = meterDevices
  return {
    items: items.map((item) => ({ ...item })),
  }
}

function meterReducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case "change":
      return { ...state, ...payload }
    case "create_items":
      return { ...state }
    default:
      console.error("meter items", type)
      return state
  }
}
// previousReadings
// currentReadings
function createMeterItems() {}
