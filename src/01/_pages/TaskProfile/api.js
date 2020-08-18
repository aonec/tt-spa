import axios from "01/axios"

const createHeader = ({
  creationTime,
  closingTime,
  expectedCompletionTime,
  currentStage,
  name,
}) => ({
  title: currentStage ? currentStage.name : name,
  name: currentStage && name,
  timeline: {
    creationTime,
    closingTime,
    expectedCompletionTime,
  },
  timer: {
    creationTime,
    closingTime,
    expectedCompletionTime,
    currentStage,
  },
})

export const getTaskPage = async (url = "", dispatch = () => {}) => {
  try {
    const res = await axios.get(url)
    sessionStorage.setItem("data", JSON.stringify(res))
    dispatch({
      type: "initial_page",
      data: {
        ...res,
        header: createHeader(res),
        panel: res.currentStage,
        stages: { list: res.stages },
      },
    })
  } catch (error) {}
}

export const postMoveStage = async (
  url = "",
  move = "",
  data = {},
  dispatch = () => {}
) => {
  try {
    const res = await axios.post(`${url}/${move}stage`, data)
    if (res.successResponse === null)
      return dispatch({
        type: "success",
        data: { isReplace: true, move: null },
      })
    dispatch({
      type: "success",
      data: {
        ...res,
        move: null,
        header: createHeader(res),
        panel: res.currentStage,
        stages: { list: res.stages },
      },
    })
  } catch (error) {}
}
