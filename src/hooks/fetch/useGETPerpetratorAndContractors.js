import { useEffect, useState } from "react"
import axios from "axios"
import { request } from "services/api"

export const useGETPerpetratorsAndContractors = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .all([request("ManagingFirmUsers"), request("Contractors")])
      .then(
        axios.spread((p, c) =>
          setData({ perpetrators: p.items, contractors: c.items })
        )
      )
  }, [])

  return data
}
