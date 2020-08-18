import { useEffect, useState } from "react"
import axios from "services/ajax"

export const useSelectOptions = (type) => {
  const [perpetrators, setPerpetrators] = useState([])
  const [contractors, setContractors] = useState([])
  useEffect(() => {
    if (type === "all") getAll()
  }, [type])

  function getAll() {
    axios.all([axios("ManagingFirmUsers"), axios("Contractors")]).then(
      axios.spread((p, c) => {
        console.log(c)
        setPerpetrators(p.data.successResponse.items)
        setContractors(c.data.successResponse.items)
      })
    )
  }
  return { perpetrators, contractors }
}
