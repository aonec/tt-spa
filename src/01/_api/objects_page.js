import axios from "01/axios"
import { createTimeline, createTimer, createDevice } from "./utils"

const URL = "HousingStocks"

const replaceURL = (url = "") => url.replace(/objects/, URL)

export async function getInfo(url = "") {
  try {
    const res = await axios.get(replaceURL(url))
    return { ...res, info: true, header: createTitleObject(res) }
  } catch (error) {}
}

export async function getDevices(url = "") {
  try {
    const res = await axios.get(replaceURL(url))
    return {
      ...res,
      header: createTitleObject(res.housingStock),
      city: res.housingStock.city,
      devices: {
        items: res.devices.map(createDevice),
        loading: false,
      },
    }
  } catch (error) {}
}

export async function getEvents(...ids) {
  try {
    const res = await axios.get("tasks", {
      params: {
        GroupType: "NotArchived",
        Take: 3,
        HousingStockId: ids[0] ?? null,
        DeviceId: ids[1] ?? null,
      },
    })
    return {
      events: {
        items: res.items.map((item) => ({
          ...item,
          timeline: createTimeline(item),
          timer: createTimer(item),
        })),
        loading: false,
      },
    }
  } catch (error) {}
}

export async function getApartments(params) {
  try {
    const res = await axios.get("apartments", { params })
    return { apartments: { ...res, loading: false } }
  } catch (error) {}
}

// utils
function createTitleObject(data) {
  const { street, number, city } = data
  return [`${street}, ${number}`, city]
}
