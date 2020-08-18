import axios from "01/axios"
import { createTimeline, createTimer, createDevice } from "./utils"

export async function getTasks(grouptype = null) {
  try {
    const res = await axios.get("tasks", { params: { grouptype } })
    return {
      ...res,
      items: res.items.map((item) => ({
        ...item,
        timeline: createTimeline(item),
        timer: createTimer(item),
        device: createDevice(item.device),
        calendar: new Date(item.creationTime ?? null).toLocaleString(),
        showExecutor: grouptype === "observing",
      })),
    }
  } catch (error) {}
}
