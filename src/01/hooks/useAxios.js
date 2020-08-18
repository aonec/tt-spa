import React from "react"
import axios from "01/axios"

const initialState = {
  data: null,
  loading: null,
  error: null,
  config: {},
}

export const useAxios = (config) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    const { payload, type } = action
    switch (type) {
      case "start":
        return { ...initialState, config: payload }
      case "success":
        return { ...initialState, data: payload }
      default:
        console.error("fetch", type)
        return state
    }
  }, initialState)

  React.useEffect(() => {})

  const request = axios.create({
    ...config,
    transformResponse: [
      (data, ...p) => {
        console.log("data", JSON.parse(data), p)
        return data
      },
    ],
  })

  return { ...state, request }
}
