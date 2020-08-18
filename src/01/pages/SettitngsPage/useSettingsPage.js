import React from "react"
import { useRouteMatch } from "react-router-dom"
import axios from "01/axios"

let cancel = () => {}
async function settingFetch(config) {
  try {
    const res = await axios({
      ...config,
      cancelToken: new axios.CancelToken((e) => {
        cancel = e
      }),
    })
    const data = res.data.successResponse
    const url = res.config.url
    if (/current$/.test(url))
      return Promise.resolve({ managementCompany: data })
    if (/users$/gi.test(url)) return Promise.resolve({ users: data.items })
    if (/users[/](\d+)$/gi.test(url))
      return Promise.resolve({ currentUser: data })
    if (/c*tors/gi) return Promise.resolve({ contractors: data.items })
  } catch (error) {}
}

export const useSettingsPage = () => {
  const { isExact, path } = useRouteMatch()
  const users = useRouteMatch(path + "users")
  const currentUser = useRouteMatch(users?.path + "/(\\d+)")
  const ctrs = useRouteMatch(path + "contractors")

  // console.log(currentUser)
  const [{ config, ...state }, dispatch] = React.useReducer(
    (state, action) => {
      const { type, payload } = action
      switch (type) {
        case "start":
          return { ...state, config: payload, loading: true }
        case "finish":
          console.log(payload)
          return { ...state, ...payload, loading: false }
        default:
          console.error("settings", type)
          return state
      }
    },
    {
      managementCompany: null,
      contractors: null,
      users: null,
      currentUser: null,
      config: null,
      loaing: true,
      error: null,
    }
  )
  React.useEffect(() => () => cancel(), [])

  React.useEffect(() => {
    console.log(1)
    config &&
      settingFetch(config).then((data) =>
        dispatch({ type: "finish", payload: data })
      )
  }, [config])

  React.useEffect(() => {
    if (isExact && !state.managementCompany)
      dispatch({ type: "start", payload: { url: "ManagingFirms/current" } })
    if (users?.isExact && !state.users)
      dispatch({ type: "start", payload: { url: "ManagingFirmUsers" } })
    if (currentUser?.isExact)
      dispatch({
        type: "start",
        payload: { url: "ManagingFirmUsers/" + currentUser.params[0] },
      })
    if (ctrs?.isExact && !state.contractors)
      dispatch({ type: "start", payload: { url: "contractors" } })
  }, [isExact, users?.isExact, currentUser?.isExact, ctrs?.isExact, dispatch])

  return { ...state, path }
}
// /api/ManagingFirmUsers
// contractors
