import React from "react"
import axios from "01/axios"

const initData = {
  data: null,
  error: null,
  loading: false,
  config: null,
}

export function usePageFetch() {
  const [state, fetch] = React.useReducer((state, action) => {
    const { type = "", data = {}, error = {}, config = {} } = action
    switch (type) {
      case "start":
        return { ...initData, config, loading: true }
      case "success":
        return { ...initData, data }
      case "error":
        return { ...initData, error }
      default:
        console.log("fetch", type)
        return state
    }
  }, initData)

  const { config } = state
  async function fetchPage() {
    try {
      const res = await axios(config)
      const data = res.data.successResponse
      sessionStorage.setItem("data", JSON.stringify(data))
      fetch({ type: "success", data })
    } catch (error) {}
  }

  React.useEffect(() => {
    config && fetchPage()
  }, [config])

  return { ...state, fetch }
}
