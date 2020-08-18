import React from "react"
import { useRouteMatch } from "react-router-dom"
import axios from "01/axios"

const initialState = {
  data: null,
  error: null,
  loading: true,
  config: null,
}

export const useTaskId = () => {
  const { url } = useRouteMatch()
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const { payload, type } = action
      switch (type) {
        case "success":
          return { ...state, ...initialState, ...payload }
        case "push_stage":
          return {
            ...state,
            config: { url: url + "/pushstage", method: "post", data: payload },
            loading: true,
          }
        default:
          console.error("tasks", type)
          return state
      }
    },
    {
      ...initialState,
      config: { url },
    }
  )

  React.useEffect(() => {
    state.config &&
      (async () => {
        try {
          const res = await axios(state.config)
          const data = res.data.successResponse
          dispatch({ type: "success", payload: { data } })
        } catch (error) {}
      })()
  }, [state.config])

  return {
    data: state.data,
    state,
    dispatch,
  }
}
