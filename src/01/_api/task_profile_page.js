import axios from "01/axios"
import {
  createTimeline,
  createTimer,
  changeItemStage,
  createPanel,
  createDevice,
} from "./utils"

export async function getTask(id) {
  try {
    const res = await axios.get("/tasks/" + id)
    sessionStorage.setItem("data", JSON.stringify(res))

    const { currentStage, name, stages, userOperatingStatus } = res
    const items = stages.map((...rest) =>
      changeItemStage(...rest, userOperatingStatus === "Executor")
    )
    return {
      ...res,
      header: {
        timer: createTimer(res),
        timeline: createTimeline(res),
        title: currentStage ? currentStage.name : name,
        name: currentStage && name,
      },
      panel: {
        ...currentStage,
        actions: createPanel(currentStage),
        userOperatingStatus,
        perpName: currentStage?.perpetrator.name,
      },
      stages: {
        items: [],
      },
      stages: {
        items,
      },
      device: createDevice(res.device),
    }
  } catch (error) {}
}

export async function moveStage(id = "", move = "", data = {}) {
  try {
    const res = await axios.post(`/tasks/${id}/${move}stage`, data)
    const { currentStage, name, stages, userOperatingStatus } = res
    if (res.successResponse === null || currentStage === null) {
      return { isReplace: true }
    }
    const items = stages.map((...rest) =>
      changeItemStage(...rest, userOperatingStatus === "Executor")
    )
    return {
      ...res,
      header: {
        timer: createTimer(res),
        timeline: createTimeline(res),
        title: currentStage ? currentStage.name : name,
        name: currentStage && name,
      },
      panel: {
        ...currentStage,
        actions: createPanel(currentStage),
        userOperatingStatus,
        perpName: currentStage?.perpetrator.name,
      },
      stages: {
        items,
      },
      panelLoading: false,
      stageData: null,
    }
  } catch (error) {}
}

export async function deleteDoc(id = "", docId = "") {
  try {
    const res = await axios.delete(`/tasks/${id}/documents/${docId}`)
    const { url = "" } = res
    const responseId = Number(url.match(/(\d*)$/)[0])
    return responseId
  } catch (error) {}
}
