import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { request } from "services/api"

export const useEvents = (start) => {
  const [state, setState] = useState({ loading: true, items: [] })
  const { housingStockId, deviceId } = useParams()

  useEffect(() => {
    if (start) {
      request(createUrl(housingStockId, deviceId)).then((data) =>
        setState({ ...data, loading: false })
      )
    }
    // eslint-disable-next-line
  }, [start])
  return state
}

function createUrl(housingStockId, deviceId) {
  if (deviceId) return `Tasks?GroupType=NotArchived&Take=3&DeviceId=${deviceId}`
  return `Tasks?GroupType=NotArchived&Take=3&HousingStockId=${housingStockId}`
}
