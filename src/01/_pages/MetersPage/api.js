import axios from "01/axios"
import { createDevice } from "01/_api/utils"

export async function getApartmetns(params) {
  try {
    const res = await axios.get("apartments", { params })
    return { apartments: res }
  } catch (error) {}
}

export async function getApartmentInfo(id) {
  try {
    const res = await Promise.allSettled([
      axios.get(`apartments/${id}`),
      axios.get("IndividualDevices", { params: { ApartmentId: 863449 } }),
    ])

    const [{value: apartInfo}, {value: meterDevices}] = res;
    return {
      apartInfo,
      meterDevices: {
        ...meterDevices,
        items: meterDevices.items.map(createDevice),
      },
    }
  } catch (error) {}
}
