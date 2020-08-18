import React from "react"
import axios from "01/axios"
import { useRouteMatch } from "react-router-dom"
import { api } from "./api"
import { ObjectId } from "./ObjectId"

async function fetchData(config) {
  try {
    const res = await axios({
      ...config,
      cancelToken: new axios.CancelToken((e) => {}),
    })
    const url = res.config.url
    const data = res.data.successResponse

    if (url.match(/stocks[/]$/gi)) {
      return Promise.resolve({ objList: data.items })
    }

    return Promise.resolve(data)
  } catch (error) {}
}

const initialState = { loading: false, error: null }

export const useObjectPage = (defatulConf) => {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      const { type, payload } = action
      switch (type) {
        case "success":
          return { ...state, ...initialState, ...payload }
        case "get":
          return { ...state, config: payload }
        default:
          console.error("obj", type)
          return state
      }
    },
    { ...initialState, config: defatulConf ?? null, loading: !!defatulConf }
  )

  React.useEffect(() => {
    state.config &&
      fetchData(state.config).then((data) =>
        dispatch({ type: "success", payload: data })
      )
  }, [state.config])

  React.useEffect(() => () => {}, [])

  const objects = useRouteMatch("/:page")
  const objectId = useRouteMatch("/(\\w+)/:id")
  const apartments = useRouteMatch("/:page/:id/devices")
  console.log(objectId)

  React.useEffect(() => {
    if (objects.isExact) dispatch({ type: "get", payload: api.getObjects() })
  }, [])

  React.useEffect(() => {
    if (objectId?.isExact) {
      const { id } = objectId.params
      dispatch({ type: "get", payload: api.getObjectId(id) })
    }

    if (apartments?.isExact) {
      const { id } = apartments.params
      dispatch({ type: "get", payload: api.getObjectDevices(id) })
    }
  }, [objectId?.isExact, apartments?.isExact])

  return { ...state, dispatch }
}
